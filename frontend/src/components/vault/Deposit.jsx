import { useState } from "react";
import { Lock, Hash, Wallet } from "lucide-react";
import {
  generateCommitment,
  depositToStellar,
} from "../../api/vault";

export default function Deposit() {
  const [secret, setSecret] = useState("123");
  const [depositId, setDepositId] = useState("999");
  const [amount, setAmount] = useState("1000");

  const [loading, setLoading] = useState(false);

  async function handleGenerateCommitment() {
    setLoading(true);

    try {
      const result = await generateCommitment({
        secret,
        depositId,
        amount,
      });

      console.log(result);

      localStorage.setItem(
        "commitment",
        result.commitment
      );

      window.dispatchEvent(
        new Event("commitment")
      );

      alert("Commitment Generated Successfully!");
    } catch (err) {
      console.error(err);
      alert("Backend Error");
    }

    setLoading(false);
  }

  async function handleDeposit() {
    const commitment = localStorage.getItem("commitment");

    if (!commitment) {
      alert("Generate Commitment first!");
      return;
    }

    setLoading(true);

    try {
      const result = await depositToStellar({
        depositId,
        commitment,
        amount,
      });

      console.log(result);

      localStorage.setItem("depositStatus", "completed");
localStorage.setItem("depositId", depositId);

      window.dispatchEvent(
        new Event("deposit")
      );

      alert("Deposit Successful!");
    } catch (err) {
      console.error(err);
      alert("Deposit Failed!");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        background: "#101010",
        border: "1px solid #222",
        borderRadius: 18,
        padding: 30,
      }}
    >
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 25,
        }}
      >
        <Lock size={24} />
        Deposit
      </h2>

      <label style={{ color: "#888" }}>
        Secret
      </label>

      <div style={{ height: 8 }} />

      <input
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        style={input}
      />

      <div style={{ height: 20 }} />

      <label style={{ color: "#888" }}>
        Deposit ID
      </label>

      <div style={{ height: 8 }} />

      <input
        value={depositId}
        onChange={(e) => setDepositId(e.target.value)}
        style={input}
      />

      <div style={{ height: 20 }} />

      <label style={{ color: "#888" }}>
        Amount
      </label>

      <div style={{ height: 8 }} />

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={input}
      />

      <div style={{ height: 30 }} />

      <button
        style={button}
        onClick={handleGenerateCommitment}
        disabled={loading}
      >
        <Hash size={18} />

        {loading
          ? "Generating..."
          : "Generate Commitment"}
      </button>

      <div style={{ height: 20 }} />

      <button
        style={{
          ...button,
          background: "#222",
          color: "white",
        }}
        onClick={handleDeposit}
        disabled={loading}
      >
        <Wallet size={18} />

        {loading
          ? "Depositing..."
          : "Deposit to Stellar"}
      </button>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "15px",
  background: "#181818",
  border: "1px solid #333",
  borderRadius: "12px",
  color: "white",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const button = {
  width: "100%",
  padding: "16px",
  background: "white",
  color: "black",
  border: "none",
  borderRadius: "12px",
  fontWeight: 700,
  fontSize: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
};