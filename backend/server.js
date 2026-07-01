const express = require("express");
require("dotenv").config();
const cors = require("cors");
const depositStellarRoute = require("./routes/depositStellar");
const depositRoute = require("./routes/deposit");
require("dotenv").config();
const app = express();
const proofRoute=require("./routes/proof");
const verifyRoute=require("./routes/verify");
const withdrawRoute = require("./routes/withdraw");




app.use(cors());
app.use(express.json());
app.use("/verify",verifyRoute);
app.use("/deposit", depositRoute);
app.use("/deposit-stellar", depositStellarRoute); 
app.use("/withdraw", withdrawRoute);
app.use("/proof",proofRoute);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ShadowVault Backend Running"
    });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});