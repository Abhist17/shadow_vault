import { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  CheckCircle2,
} from "lucide-react";

import { generateProof } from "../../api/vault";

export default function Proof() {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(
    localStorage.getItem("proofGenerated") === "true"
  );

  async function handleProof() {
    setLoading(true);

    try {
      await generateProof();

      localStorage.setItem("proofGenerated", "true");

      setGenerated(true);

      window.dispatchEvent(new Event("proof"));

      alert("Proof Generated Successfully!");
    } catch (err) {
      console.error(err);
      alert("Proof Generation Failed!");
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
            STEP 03
          </p>

          <h2 style={{ margin: 0 }}>
            Generate Proof
          </h2>

        </div>

        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(212,175,55,.08)",
            display: "grid",
            placeItems: "center",
            color: "#D4AF37",
          }}
        >
          <Cpu size={28} />
        </div>
      </div>

      <p
        style={{
          color: "#999",
          lineHeight: 1.8,
        }}
      >
        Generate an Ultrahonk zero-knowledge proof
        proving ownership without revealing your
        private secret.
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span style={{ color: "#888" }}>
            Proof System
          </span>

          <strong>UltraHonk</strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span style={{ color: "#888" }}>
            Circuit
          </span>

          <strong>Noir</strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "#888" }}>
            Status
          </span>

          <span
            style={{
              color: generated
                ? "#4ADE80"
                : "#D4AF37",
              fontWeight: 700,
            }}
          >
            {generated
              ? "Generated"
              : "Waiting"}
          </span>
        </div>
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
        onClick={handleProof}
      >
        {generated ? (
          <>
            <CheckCircle2 size={18} />
            Generate Proof
          </>
        ) : (
          <>
            <Sparkles size={18} />
            {loading
              ? "Generating..."
              : "Generate Proof"}
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
            Security
          </p>

          <strong>Zero Knowledge</strong>

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
          <ShieldCheck size={18} />
          Private
        </div>

      </div>

    </div>
  );
}