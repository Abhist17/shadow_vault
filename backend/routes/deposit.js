const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {

    const { secret, depositId, amount } = req.body;

    const commitment =
        String(secret) +
        "_" +
        String(depositId) +
        "_" +
        Date.now();

    res.json({
        success: true,
        commitment,
        amount
    });

});

module.exports = router;