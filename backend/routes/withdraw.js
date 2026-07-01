const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

router.post("/", (req, res) => {

    const { depositId, nullifier } = req.body;

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

        res.json({
            success: true,
            message: "Withdrawal Successful!",
            result: stdout.trim(),
        });

    });

});

module.exports = router;