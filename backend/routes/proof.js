const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const router = express.Router();

router.post("/", async (req, res) => {
  const cwd = path.resolve(
    __dirname,
    "../../circuits/ownership_vault"
  );

  const run = (cmd, args) =>
    new Promise((resolve, reject) => {
      const p = spawn(cmd, args, { cwd });

      let err = "";

      p.stderr.on("data", d => err += d.toString());

      p.on("close", code => {
        if (code === 0) resolve();
        else reject(err);
      });
    });

  try {

    await run("nargo", ["execute"]);

    await run("bb", [
      "prove",
      "-b",
      "target/ownership_vault.json",
      "-w",
      "target/ownership_vault.gz",
      "-o",
      "target/proof",
    ]);

    res.json({
      success: true,
      message: "Proof Generated Successfully",
    });

  } catch (e) {

    console.error(e);

    res.status(500).json({
      success: false,
      error: e.toString(),
    });

  }
});

module.exports = router;