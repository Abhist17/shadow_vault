const express = require("express");
const cors = require("cors");
const depositStellarRoute = require("./routes/depositStellar");
const depositRoute = require("./routes/deposit");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/deposit", depositRoute);
app.use("/deposit-stellar", depositStellarRoute);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ShadowVault Backend Running"
    });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});