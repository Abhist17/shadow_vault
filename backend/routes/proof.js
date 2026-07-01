const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {

    const circuitDir = path.join(
        __dirname,
        "../../circuits/ownership_vault"
    );

    const command = `
cd "${circuitDir}" &&
pwd &&
ls target &&
nargo execute &&
/home/abhi/.bb/bin/bb prove \
-b target/ownership_vault.json \
-w target/ownership_vault.gz \
-o target/proof
`;

    console.log(command);

    exec(command, { maxBuffer: 1024 * 1024 * 20 }, (error, stdout, stderr) => {

        console.log("STDOUT:");
        console.log(stdout);

        console.log("STDERR:");
        console.log(stderr);

        if (error) {

            return res.status(500).json({
                success:false,
                error:error.message
            });

        }

        res.json({
            success:true
        });

    });

});

module.exports = router;