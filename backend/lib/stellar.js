"use strict";

const config = require("./config");
const { run } = require("./exec");

let cachedAddress = null;

/** Public key of the configured signing identity, resolved once. */
async function sourceAddress() {
  if (!cachedAddress) {
    const { stdout } = await run(config.STELLAR_BIN, ["keys", "address", config.SOURCE_ACCOUNT]);
    cachedAddress = stdout.trim();
  }
  return cachedAddress;
}

function invoke(contractId, args) {
  return run(
    config.STELLAR_BIN,
    [
      "contract", "invoke",
      "--id", contractId,
      "--source", config.SOURCE_ACCOUNT,
      "--network", config.NETWORK,
      "--send", "yes",
      "--",
      ...args,
    ],
    { timeout: 180_000 }
  );
}

/** Record a commitment on-chain. */
async function deposit({ depositId, commitment, amount }) {
  const depositor = await sourceAddress();

  const { stdout } = await invoke(config.VAULT_CONTRACT_ID, [
    "deposit",
    "--depositor", depositor,
    "--deposit-id", String(depositId),
    "--commitment", commitment,
    "--amount", String(amount),
  ]);

  return stdout.trim();
}

async function getDeposit(depositId) {
  const { stdout } = await run(config.STELLAR_BIN, [
    "contract", "invoke",
    "--id", config.VAULT_CONTRACT_ID,
    "--source", config.SOURCE_ACCOUNT,
    "--network", config.NETWORK,
    "--",
    "get_deposit",
    "--deposit-id", String(depositId),
  ]);

  return JSON.parse(stdout.trim());
}

/** Check a proof against the verifier contract on its own, without withdrawing. */
async function verifyProof({ publicInputsPath, proofPath }) {
  const { stdout } = await invoke(config.VERIFIER_CONTRACT_ID, [
    "prove_identity",
    "--public_inputs-file-path", publicInputsPath,
    "--proof_bytes-file-path", proofPath,
  ]);

  return stdout.trim();
}

/** Withdraw: the vault re-checks the proof itself before releasing the deposit. */
async function withdraw({ depositId, nullifier, publicInputsPath, proofPath }) {
  const { stdout } = await invoke(config.VAULT_CONTRACT_ID, [
    "withdraw",
    "--deposit-id", String(depositId),
    "--nullifier", nullifier,
    "--public_inputs-file-path", publicInputsPath,
    "--proof-file-path", proofPath,
  ]);

  return stdout.trim();
}

module.exports = { sourceAddress, deposit, getDeposit, verifyProof, withdraw };
