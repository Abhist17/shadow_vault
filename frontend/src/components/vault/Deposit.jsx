import { useState } from "react";
import {
  Lock,
  Hash,
  Wallet,
  Coins,
  ShieldCheck,
} from "lucide-react";

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

      localStorage.setItem("commitment", result.commitment);
      localStorage.setItem("depositId", depositId);

      window.dispatchEvent(new Event("commitment"));

      alert("Commitment Generated Successfully!");
    } catch {
      alert("Backend Error");
    }

    setLoading(false);
  }

  async function handleDeposit() {
    const commitment = localStorage.getItem("commitment");

    if (!commitment) {
      alert("Generate Commitment First");
      return;
    }

    setLoading(true);

    try {
      await depositToStellar({
        depositId,
        commitment,
        amount,
      });

      localStorage.setItem("depositStatus", "completed");

      window.dispatchEvent(new Event("deposit"));

      alert("Deposited Successfully!");
    } catch {
      alert("Deposit Failed");
    }

    setLoading(false);
  }

  return (
    <div className="card">

      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:30,
        }}
      >
        <div>

          <p
            style={{
              color:"#D4AF37",
              fontWeight:700,
              marginBottom:8,
            }}
          >
            STEP 01
          </p>

          <h2
            style={{
              margin:0,
            }}
          >
            Deposit Assets
          </h2>

        </div>

        <div
          style={{
            width:60,
            height:60,
            borderRadius:"50%",
            display:"grid",
            placeItems:"center",
            background:"rgba(212,175,55,.08)",
            color:"#D4AF37",
          }}
        >
          <Wallet size={28}/>
        </div>
      </div>

      <label>Secret</label>

      <div style={{height:8}}/>

      <input
        value={secret}
        onChange={(e)=>setSecret(e.target.value)}
      />

      <div style={{height:18}}/>

      <label>Deposit ID</label>

      <div style={{height:8}}/>

      <input
        value={depositId}
        onChange={(e)=>setDepositId(e.target.value)}
      />

      <div style={{height:18}}/>

      <label>Amount</label>

      <div style={{height:8}}/>

      <input
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />

      <div style={{height:30}}/>

      <button
        className="btn-primary"
        style={{
          width:"100%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          gap:12,
        }}
        onClick={handleGenerateCommitment}
        disabled={loading}
      >
        <Hash size={18}/>

        {loading
          ? "Generating..."
          : "Generate Commitment"}
      </button>

      <div style={{height:15}}/>

      <button
        style={{
          width:"100%",
          padding:"17px",
          borderRadius:14,
          background:"#161616",
          color:"white",
          border:"1px solid rgba(212,175,55,.15)",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          gap:12,
        }}
        onClick={handleDeposit}
        disabled={loading}
      >
        <Coins size={18}/>

        Deposit to Stellar
      </button>

      <div
        style={{
          marginTop:28,
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          paddingTop:22,
          borderTop:"1px solid rgba(255,255,255,.06)",
        }}
      >
        <div>

          <p
            style={{
              margin:0,
              color:"#888",
              fontSize:14,
            }}
          >
            Network
          </p>

          <strong>Stellar</strong>

        </div>

        <div
          style={{
            display:"flex",
            alignItems:"center",
            gap:8,
            color:"#D4AF37",
            fontWeight:700,
          }}
        >
          <ShieldCheck size={18}/>

          Secure
        </div>

      </div>

    </div>
  );
}