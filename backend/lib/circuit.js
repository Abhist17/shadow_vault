"use strict";

const fs = require("fs/promises");
const path = require("path");

const config = require("./config");
const { run } = require("./exec");
const { commitmentOf, nullifierOf, toHex32, toField } = require("./poseidon");

// nargo and bb both read Prover.toml and write target/ inside the circuit
// package, so two concurrent proofs would clobber each other. Serialize them.
let queue = Promise.resolve();

function withCircuitLock(task) {
  const result = queue.then(task, task);
  queue = result.catch(() => {});
  return result;
}

function artifactDir(depositId) {
  return path.join(config.ARTIFACT_DIR, String(depositId));
}

/**
 * Derive the public values for a deposit without touching the chain or the
 * prover. Cheap enough to call on every keystroke.
 */
async function derive(secret, depositId) {
  const commitment = await commitmentOf(secret, depositId);
  const nullifier = await nullifierOf(secret);

  return {
    commitment: toHex32(commitment),
    nullifier: toHex32(nullifier),
    commitmentField: commitment.toString(),
    nullifierField: nullifier.toString(),
  };
}

/**
 * Generate an UltraHonk proof that `secret` opens the commitment for `depositId`.
 *
 * The witness is written per request, so the proof actually binds to the user's
 * inputs. Previously this ran against a checked-in Prover.toml and every user
 * received a proof of the same hardcoded statement.
 */
async function prove(secret, depositId) {
  const derived = await derive(secret, depositId);

  return withCircuitLock(async () => {
    const proverToml =
      `secret = "${toField(secret)}"\n` +
      `deposit_id = "${toField(depositId)}"\n` +
      `commitment = "${derived.commitmentField}"\n` +
      `nullifier = "${derived.nullifierField}"\n`;

    await fs.writeFile(path.join(config.CIRCUIT_DIR, "Prover.toml"), proverToml, "utf8");

    // bb refuses to overwrite an existing directory named `vk` / `proof`, which
    // is how a previous aborted run leaves the target dir.
    const target = path.join(config.CIRCUIT_DIR, "target");
    for (const stale of ["vk", "proof"]) {
      const entry = path.join(target, stale);
      const stat = await fs.stat(entry).catch(() => null);
      if (stat?.isDirectory()) await fs.rm(entry, { recursive: true, force: true });
    }

    await run(config.NARGO_BIN, ["execute"], { cwd: config.CIRCUIT_DIR });

    // --oracle_hash keccak is mandatory: the Soroban verifier reconstructs the
    // Fiat-Shamir transcript with keccak, so a default-oracle proof is valid
    // locally and rejected on-chain.
    await run(
      config.BB_BIN,
      [
        "prove",
        "--scheme", "ultra_honk",
        "--oracle_hash", "keccak",
        "--bytecode_path", path.join("target", `${config.CIRCUIT_NAME}.json`),
        "--witness_path", path.join("target", `${config.CIRCUIT_NAME}.gz`),
        "--output_path", "target",
        "--output_format", "bytes_and_fields",
      ],
      { cwd: config.CIRCUIT_DIR }
    );

    // Park the artifacts under this deposit so /verify and /withdraw operate on
    // the proof that belongs to them, not on whatever ran last.
    const dir = artifactDir(depositId);
    await fs.mkdir(dir, { recursive: true });

    for (const file of ["proof", "public_inputs"]) {
      await fs.copyFile(path.join(target, file), path.join(dir, file));
    }

    const publicInputs = await fs.readFile(path.join(dir, "public_inputs"));

    if (publicInputs.length !== 64) {
      throw new Error(`Expected 64 bytes of public inputs, got ${publicInputs.length}`);
    }

    const provedCommitment = publicInputs.subarray(0, 32).toString("hex");
    const provedNullifier = publicInputs.subarray(32, 64).toString("hex");

    // Fail loudly here rather than letting the contract reject it later.
    if (provedCommitment !== derived.commitment || provedNullifier !== derived.nullifier) {
      throw new Error("Proof public inputs do not match the derived commitment/nullifier");
    }

    return {
      ...derived,
      proofPath: path.join(dir, "proof"),
      publicInputsPath: path.join(dir, "public_inputs"),
      proofBytes: (await fs.stat(path.join(dir, "proof"))).size,
    };
  });
}

/** Paths to a previously generated proof, or null if none exists yet. */
async function artifactsFor(depositId) {
  const dir = artifactDir(depositId);
  const proofPath = path.join(dir, "proof");
  const publicInputsPath = path.join(dir, "public_inputs");

  const ok = await Promise.all([
    fs.access(proofPath).then(() => true, () => false),
    fs.access(publicInputsPath).then(() => true, () => false),
  ]);

  if (!ok[0] || !ok[1]) return null;

  const publicInputs = await fs.readFile(publicInputsPath);

  return {
    proofPath,
    publicInputsPath,
    commitment: publicInputs.subarray(0, 32).toString("hex"),
    nullifier: publicInputs.subarray(32, 64).toString("hex"),
  };
}

module.exports = { derive, prove, artifactsFor };
