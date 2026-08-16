"use strict";

const express = require("express");

const circuit = require("../lib/circuit");
const stellar = require("../lib/stellar");
const v = require("../lib/validate");

const router = express.Router();

/** Wrap an async handler so a rejection becomes a normal error response. */
const handle = (fn) => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);

/**
 * Step 1a — derive the commitment and nullifier from the secret.
 *
 * Uses Poseidon2 over BN254, the exact hash the circuit asserts against. The
 * secret never leaves this process and is not persisted.
 */
router.post(
  "/deposit",
  handle(async (req, res) => {
    const secret = v.secret(req.body.secret);
    const depositId = v.depositId(req.body.depositId);
    const amount = v.amount(req.body.amount ?? 1);

    const derived = await circuit.derive(secret, depositId);

    res.json({
      success: true,
      depositId,
      amount,
      commitment: derived.commitment,
      nullifier: derived.nullifier,
    });
  })
);

/** Step 1b — record the commitment in the vault contract. */
router.post(
  "/deposit-stellar",
  handle(async (req, res) => {
    const depositId = v.depositId(req.body.depositId);
    const commitment = v.hex32(req.body.commitment, "commitment");
    const amount = v.amount(req.body.amount);

    const result = await stellar.deposit({ depositId, commitment, amount });

    res.json({ success: true, message: "Deposit recorded on Stellar", depositId, result });
  })
);

/** Step 2 — prove ownership of the deposit in zero knowledge. */
router.post(
  "/proof",
  handle(async (req, res) => {
    const secret = v.secret(req.body.secret);
    const depositId = v.depositId(req.body.depositId);

    const started = Date.now();
    const proof = await circuit.prove(secret, depositId);

    res.json({
      success: true,
      depositId,
      commitment: proof.commitment,
      nullifier: proof.nullifier,
      proofBytes: proof.proofBytes,
      elapsedMs: Date.now() - started,
    });
  })
);

/** Step 3 — check the proof against the on-chain verifier, without withdrawing. */
router.post(
  "/verify",
  handle(async (req, res) => {
    const depositId = v.depositId(req.body.depositId);

    const artifacts = await circuit.artifactsFor(depositId);
    if (!artifacts) {
      throw new v.BadRequest("No proof found for this deposit. Generate a proof first.");
    }

    const started = Date.now();
    await stellar.verifyProof(artifacts);

    res.json({
      success: true,
      verified: true,
      depositId,
      commitment: artifacts.commitment,
      elapsedMs: Date.now() - started,
    });
  })
);

/** Step 4 — withdraw. The vault re-verifies the proof and burns the nullifier. */
router.post(
  "/withdraw",
  handle(async (req, res) => {
    const depositId = v.depositId(req.body.depositId);

    const artifacts = await circuit.artifactsFor(depositId);
    if (!artifacts) {
      throw new v.BadRequest("No proof found for this deposit. Generate a proof first.");
    }

    const result = await stellar.withdraw({
      depositId,
      nullifier: artifacts.nullifier,
      publicInputsPath: artifacts.publicInputsPath,
      proofPath: artifacts.proofPath,
    });

    res.json({
      success: true,
      message: "Withdrawal complete",
      depositId,
      nullifier: artifacts.nullifier,
      result,
    });
  })
);

/** Read the on-chain record for a deposit. */
router.get(
  "/deposit/:depositId",
  handle(async (req, res) => {
    const depositId = v.depositId(req.params.depositId);
    res.json({ success: true, depositId, deposit: await stellar.getDeposit(depositId) });
  })
);

module.exports = router;
