import { useState } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  Server,
  CheckCircle2,
} from "lucide-react";

import { verifyProof } from "../../api/vault";

export default function Verification() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(
    localStorage.getItem("verified") === "true"
  );

  async function handleVerify() {
    setLoading(true);

    try {
      await verifyProof();

      localStorage.setItem("verified", "true");

      setVerified(true);

      window.dispatchEvent(new Event("verified"));

      alert("Proof Verified Successfully!");
    } catch (err) {
      console.error(err);
      alert("Verification Failed!");
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
            STEP 04
          </p>

          <h2 style={{ margin: 0 }}>
            Verify Proof
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
          <ShieldCheck size={28} />
        </div>
      </div>

      <p
        style={{
          color: "#999",
          lineHeight: 1.8,
        }}
      >
        Submit the generated proof to the deployed
        Soroban verifier contract and validate
        ownership on Stellar.
      </p>

      <div
        style={{
          marginTop: 25,
          padding: 18,
          borderRadius: 16,
          background: "#0f0f0f",
          border: "1px solid rgba(212,175,55,.10)",
        }}
      >
        <Row
          label="Verifier"
          value="Soroban Contract"
        />

        <Row
          label="Blockchain"
          value="Stellar"
        />

        <Row
          label="Status"
          value={
            verified
              ? "Verified"
              : "Pending"
          }
          success={verified}
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
          gap: 10,
        }}
        disabled={loading}
        onClick={handleVerify}
      >
        {verified ? (
          <>
            <CheckCircle2 size={18} />
            Verify
          </>
        ) : (
          <>
            <BadgeCheck size={18} />
            {loading
              ? "Verifying..."
              : "Verify on Stellar"}
          </>
        )}
      </button>

      <div
        style={{
          marginTop: 28,
          borderTop: "1px solid rgba(255,255,255,.05)",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
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
            Network
          </p>

          <strong>Local Stellar</strong>

        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#D4AF37",
            fontWeight: 700,
          }}
        >
          <Server size={18} />
          Soroban
        </div>

      </div>

    </div>
  );
}

function Row({ label, value, success }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 12,
      }}
    >
      <span style={{ color: "#888" }}>
        {label}
      </span>

      <span
        style={{
          fontWeight: 700,
          color: success
            ? "#4ADE80"
            : "white",
        }}
      >
        {value}
      </span>
    </div>
  );
}