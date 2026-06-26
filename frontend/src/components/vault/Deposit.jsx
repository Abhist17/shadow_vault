import { useState } from "react";
import { Lock, Hash, Wallet } from "lucide-react";

export default function Deposit() {
  const [secret, setSecret] = useState("123");
  const [depositId, setDepositId] = useState("999");
  const [amount, setAmount] = useState("1000");

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

      <button style={button}>
        <Hash size={18} />

        Generate Commitment
      </button>

      <div style={{ height: 20 }} />

      <button
        style={{
          ...button,
          background: "#222",
        }}
      >
        <Wallet size={18} />

        Deposit to Stellar
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