const express = require("express");
const { exec } = require("child_process");
const crypto = require("crypto");

const router = express.Router();

router.post("/", (req, res) => {

    const { depositId } = req.body;

    // Generate a new random 32-byte nullifier
    const nullifier = crypto.randomBytes(32).toString("hex");

    const command = `
stellar contract invoke \
--id ${process.env.CONTRACT_ID} \
--source ${process.env.SOURCE_ACCOUNT} \
--network ${process.env.NETWORK} \
-- withdraw \
--deposit-id ${depositId} \
--nullifier ${nullifier}
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

        return res.json({
            success: true,
            message: "Withdrawal Successful!",
            nullifier,
            result: stdout.trim(),
        });

    });

});

module.exports = router;