import { useState } from "react";
import {
  Wallet,
  ArrowDownCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { withdraw } from "../../api/vault";

export default function Withdraw() {
  const [loading, setLoading] = useState(false);

  const [completed, setCompleted] = useState(
    localStorage.getItem("withdrawn") === "true"
  );

  async function handleWithdraw() {
    const depositId = Number(
      localStorage.getItem("depositId")
    );

    try {
      setLoading(true);

      await withdraw({
        depositId,
        nullifier:
          "0000000000000000000000000000000000000000000000000000000000000002",
      });

      localStorage.setItem("withdrawn", "true");

      setCompleted(true);

      alert("Funds Withdrawn Successfully!");

    } catch (err) {
      console.error(err);
      alert("Withdrawal Failed!");
    }

    setLoading(false);
  }

  return (
    <div className="card">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <div>

          <p
            style={{
              color: "#D4AF37",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            STEP 05
          </p>

          <h2 style={{ margin: 0 }}>
            Withdraw Assets
          </h2>

        </div>

        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: "rgba(212,175,55,.08)",
            color: "#D4AF37",
          }}
        >
          <Wallet size={28} />
        </div>

      </div>

      <p
        style={{
          color: "#999",
          lineHeight: 1.8,
        }}
      >
        Once your proof is successfully verified,
        the vault allows a secure withdrawal while
        preventing double spending through
        nullifiers.
      </p>

      <div
        style={{
          marginTop: 25,
          padding: 20,
          borderRadius: 16,
          background: "#0f0f0f",
          border: "1px solid rgba(212,175,55,.12)",
        }}
      >

        <Info
          title="Deposit ID"
          value={
            localStorage.getItem("depositId") || "999"
          }
        />

        <Info
          title="Network"
          value="Stellar"
        />

        <Info
          title="Status"
          value={
            completed
              ? "Withdrawn"
              : "Ready"
          }
          green={completed}
        />

      </div>

      <button
        className="btn-primary"
        style={{
          width: "100%",
          marginTop: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
        disabled={loading}
        onClick={handleWithdraw}
      >
        {completed ? (
          <>
            <CheckCircle2 size={18} />

            Withdrawal Complete
          </>
        ) : (
          <>
            <ArrowDownCircle size={18} />

            {loading
              ? "Processing..."
              : "Withdraw Funds"}
          </>
        )}
      </button>

      <div
        style={{
          marginTop: 30,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>

          <p
            style={{
              margin: 0,
              color: "#888",
              fontSize: 13,
            }}
          >
            Privacy
          </p>

          <strong>ZK Protected</strong>

        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            color: "#D4AF37",
            fontWeight: 700,
          }}
        >
          <ShieldCheck size={18} />

          Secure
        </div>

      </div>

    </div>
  );
}

function Info({
  title,
  value,
  green = false,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 14,
      }}
    >
      <span style={{ color: "#888" }}>
        {title}
      </span>

      <span
        style={{
          fontWeight: 700,
          color: green
            ? "#4ADE80"
            : "white",
        }}
      >
        {value}
      </span>
    </div>
  );
}