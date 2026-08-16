"use strict";

const { BarretenbergSync } = require("@aztec/bb.js");

// BN254 scalar field order. Circuit inputs are field elements, so anything we
// hash has to be reduced into this range first.
const FIELD_MODULUS =
  21888242871839275222246405745257275088548364400416034343698204186575808495617n;

let bbPromise = null;

function barretenberg() {
  if (!bbPromise) {
    bbPromise = BarretenbergSync.initSingleton();
  }
  return bbPromise;
}

/**
 * Coerce arbitrary user input into a BN254 field element.
 *
 * Decimal and 0x-prefixed hex are taken at face value; anything else is hashed
 * so that a passphrase-style secret still maps to a well-defined field element
 * rather than being rejected.
 */
function toField(value) {
  if (typeof value === "bigint") return mod(value);

  const raw = String(value).trim();

  if (/^0x[0-9a-fA-F]+$/.test(raw)) return mod(BigInt(raw));
  if (/^[0-9]+$/.test(raw)) return mod(BigInt(raw));

  // Non-numeric secret: fold it into the field via SHA-256.
  const digest = require("crypto").createHash("sha256").update(raw, "utf8").digest("hex");
  return mod(BigInt("0x" + digest));
}

function mod(n) {
  const r = n % FIELD_MODULUS;
  return r < 0n ? r + FIELD_MODULUS : r;
}

function toBuffer(field) {
  return Buffer.from(field.toString(16).padStart(64, "0"), "hex");
}

function toBigInt(buffer) {
  return BigInt("0x" + Buffer.from(buffer).toString("hex"));
}

/**
 * Poseidon2 over BN254, byte-identical to Noir's `poseidon::poseidon2::Poseidon2::hash`.
 *
 * This must stay in lockstep with circuits/ownership_vault/src/main.nr — if the
 * two disagree, every proof fails at the `assert` inside the circuit.
 */
async function poseidon2(fields) {
  const bb = await barretenberg();
  const { hash } = bb.poseidon2Hash({ inputs: fields.map(toBuffer) });
  return toBigInt(hash);
}

/** commitment = Poseidon2([secret, deposit_id]) — binds a secret to one deposit slot. */
async function commitmentOf(secret, depositId) {
  return poseidon2([toField(secret), toField(depositId)]);
}

/** nullifier = Poseidon2([secret]) — arity 1 keeps it domain-separated from the commitment. */
async function nullifierOf(secret) {
  return poseidon2([toField(secret)]);
}

/** 32-byte big-endian hex, the encoding both the CLI and the contract expect. */
function toHex32(field) {
  return field.toString(16).padStart(64, "0");
}

module.exports = {
  FIELD_MODULUS,
  toField,
  toHex32,
  poseidon2,
  commitmentOf,
  nullifierOf,
};
