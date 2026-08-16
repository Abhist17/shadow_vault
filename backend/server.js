"use strict";

const express = require("express");
const cors = require("cors");

const config = require("./lib/config");
const routes = require("./routes");
const { describe } = require("./lib/errors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "256kb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "ShadowVault Backend",
    network: config.NETWORK,
  });
});

/** Reports whether the pieces the UI depends on are actually reachable. */
app.get("/health", async (req, res) => {
  const { sourceAddress } = require("./lib/stellar");

  const health = { success: true, network: config.NETWORK };

  try {
    health.vaultContract = config.VAULT_CONTRACT_ID;
    health.verifierContract = config.VERIFIER_CONTRACT_ID;
  } catch (error) {
    health.success = false;
    health.error = error.message;
  }

  health.sourceAddress = await sourceAddress().catch(() => null);

  res.status(health.success ? 200 : 500).json(health);
});

app.use("/", routes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: `No route for ${req.method} ${req.path}` });
});

// Single error funnel: the client always receives a readable `error` string
// rather than raw CLI stderr.
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = describe(error);

  if (status >= 500) console.error(error);

  res.status(status).json({ success: false, error: message });
});

app.listen(config.PORT, () => {
  console.log(`ShadowVault backend listening on http://localhost:${config.PORT}`);
  console.log(`  network:  ${config.NETWORK}`);
  console.log(`  circuits: ${config.CIRCUIT_DIR}`);
});
