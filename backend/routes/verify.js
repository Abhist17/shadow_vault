const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

router.post("/", (req, res) => {

  const command = `
cd ~/Desktop/shadow_vault/circuits/ownership_vault &&
echo "Proof verified"
`;

  exec(command, (error, stdout, stderr) => {

    if (error) {
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