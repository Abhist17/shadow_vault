const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

const CONTRACT_ID = process.env.CONTRACT_ID;
const NETWORK = process.env.NETWORK;
const SOURCE = process.env.SOURCE_ACCOUNT;

router.post("/", (req, res) => {
  const { depositId, commitment, amount } = req.body;

  if (!depositId || !commitment || !amount) {
    return res.status(400).json({
      success: false,
      message: "depositId, commitment and amount are required",
    });
  }

const command = `
stellar contract invoke \
--id ${CONTRACT_ID} \
--source ${SOURCE} \
--network ${NETWORK} \
-- deposit \
--deposit-id ${depositId} \
--commitment ${commitment} \
--amount ${amount}
`;

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
      message: "Deposit successful!",
      result: stdout.trim(),
    });
  });
});

module.exports = router;