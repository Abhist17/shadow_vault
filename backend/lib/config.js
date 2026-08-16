"use strict";

const path = require("path");
require("dotenv").config();

const ROOT = path.resolve(__dirname, "..", "..");

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Copy backend/.env.example to backend/.env and fill it in.`
    );
  }
  return value;
}

module.exports = {
  ROOT,
  PORT: Number(process.env.PORT || 5000),
  NETWORK: process.env.STELLAR_NETWORK || "local",
  SOURCE_ACCOUNT: process.env.STELLAR_SOURCE_ACCOUNT || "alice",

  get VAULT_CONTRACT_ID() {
    return required("VAULT_CONTRACT_ID");
  },
  get VERIFIER_CONTRACT_ID() {
    return required("VERIFIER_CONTRACT_ID");
  },

  // Toolchain. Resolved from PATH by default so the project is not pinned to
  // one developer's home directory.
  NARGO_BIN: process.env.NARGO_BIN || "nargo",
  BB_BIN: process.env.BB_BIN || "bb",
  STELLAR_BIN: process.env.STELLAR_BIN || "stellar",

  CIRCUIT_DIR: process.env.CIRCUIT_DIR || path.join(ROOT, "circuits", "ownership_vault"),
  CIRCUIT_NAME: "ownership_vault",
  ARTIFACT_DIR: process.env.ARTIFACT_DIR || path.join(__dirname, "..", ".artifacts"),
};
