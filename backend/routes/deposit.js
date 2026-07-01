const express = require("express");
const crypto = require("crypto");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { secret, depositId, amount } = req.body;

    if (!secret || !depositId || !amount) {
      return res.status(400).json({
        success: false,
        message: "secret, depositId and amount are required",
      });
    }

    // Temporary 32-byte commitment
    const commitment = crypto
      .createHash("sha256")
      .update(`${secret}:${depositId}`)
      .digest("hex");

    res.json({
      success: true,
      commitment,
      amount,
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