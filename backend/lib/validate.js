"use strict";

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/** Deposit ids are u64 on-chain, so reject anything that is not one. */
function depositId(value) {
  const raw = String(value ?? "").trim();

  if (!/^[0-9]+$/.test(raw)) {
    throw new BadRequest("depositId must be a non-negative integer");
  }

  const asBigInt = BigInt(raw);
  if (asBigInt > 18446744073709551615n) {
    throw new BadRequest("depositId exceeds the u64 range");
  }

  return raw;
}

function amount(value) {
  const raw = String(value ?? "").trim();

  if (!/^[0-9]+$/.test(raw) || BigInt(raw) <= 0n) {
    throw new BadRequest("amount must be a positive integer");
  }

  return raw;
}

function secret(value) {
  const raw = String(value ?? "");

  if (raw.trim().length === 0) throw new BadRequest("secret is required");
  if (raw.length > 512) throw new BadRequest("secret is too long");

  return raw.trim();
}

function hex32(value, field) {
  const raw = String(value ?? "").trim().replace(/^0x/, "");

  if (!/^[0-9a-fA-F]{64}$/.test(raw)) {
    throw new BadRequest(`${field} must be 32 bytes of hex`);
  }

  return raw.toLowerCase();
}

module.exports = { BadRequest, depositId, amount, secret, hex32 };
