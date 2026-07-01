const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {

    const dataset = path.join(
        __dirname,
        "../../rs-soroban-ultrahonk/circuits/identity/target"
    );

    const command = `
stellar contract invoke \
--id ${process.env.VERIFIER_CONTRACT_ID} \
--source alice \
--network ${process.env.NETWORK} \
--send yes \
-- \
verify_proof \
--public_inputs-file-path ${dataset}/public_inputs \
--proof_bytes-file-path ${dataset}/proof
`;

    console.log(command);

    exec(command, (error, stdout, stderr) => {

        if (error) {
            console.error(stderr);

            return res.status(500).json({
                success: false,
                error: stderr || error.message,
            });
        }

        res.json({
            success: true,
            verified: true,
            result: stdout.trim(),
        });

    });

});

module.exports = router;