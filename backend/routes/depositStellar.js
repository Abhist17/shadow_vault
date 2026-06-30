const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { commitment, amount } = req.body;

    if (!commitment || !amount) {
      return res.status(400).json({
        success: false,
        message: "commitment and amount are required",
      });
    }

    const command = `
stellar contract invoke \
--id YOUR_VAULT_CONTRACT_ID \
--source alice \
--network testnet \
-- deposit \
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
        transaction: stdout.trim(),
      });
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;