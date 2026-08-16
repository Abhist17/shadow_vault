"use strict";

// Mirrors VaultError in contracts/vault/src/lib.rs. The CLI surfaces these as
// `Error(Contract, #N)`, which is useless in a UI, so translate them.
const VAULT_ERRORS = {
  1: "This deposit has already been withdrawn.",
  2: "No deposit exists with that ID.",
  3: "That deposit ID is already taken. Deposit IDs can only be used once.",
  4: "This nullifier was already spent — the secret has been used to withdraw before.",
  5: "The proof does not open this deposit. Check that the secret and deposit ID match the original deposit.",
  6: "Malformed public inputs: expected exactly two field elements.",
  7: "The nullifier does not match the one committed to in the proof.",
  8: "The verifier contract rejected the proof.",
  9: "Amount must be greater than zero.",
  10: "The vault has already been initialized.",
  11: "No verifier contract is configured for this vault.",
};

function describe(error) {
  const text = `${error?.stderr || ""} ${error?.message || ""}`;

  const contractError = text.match(/Error\(Contract, #(\d+)\)/);
  if (contractError) {
    const code = Number(contractError[1]);
    return VAULT_ERRORS[code] || `Contract rejected the call (error #${code}).`;
  }

  if (/Missing signing key/i.test(text)) {
    return "The configured Stellar identity cannot sign for this account.";
  }
  if (/ENOENT/.test(text)) {
    return "A required tool (stellar, nargo or bb) was not found on PATH.";
  }
  if (/error sending request|Connection refused|tcp connect error/i.test(text)) {
    return "Cannot reach the Stellar network. Is the local network running?";
  }
  if (/timed out|ETIMEDOUT/i.test(text)) {
    return "The operation timed out.";
  }

  return error?.message || "Unexpected error";
}

module.exports = { describe, VAULT_ERRORS };
