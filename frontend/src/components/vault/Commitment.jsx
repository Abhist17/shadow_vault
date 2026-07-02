import { useEffect, useState } from "react";
import {
  Copy,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function Commitment() {
  const [commitment, setCommitment] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () => {
      setCommitment(localStorage.getItem("commitment") || "");
    };

    update();

    window.addEventListener("commitment", update);

    return () =>
      window.removeEventListener(
        "commitment",
        update
      );
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(commitment);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
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
            STEP 02
          </p>

          <h2 style={{ margin: 0 }}>
            Commitment
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
          <ShieldCheck size={28} />
        </div>
      </div>

      <p
        style={{
          color: "#999",
          marginBottom: 18,
        }}
      >
      
      </p>

      <div
        style={{
          background: "#0c0c0c",
          border: "1px solid rgba(212,175,55,.15)",
          borderRadius: 18,
          padding: 20,
          minHeight: 150,
          wordBreak: "break-all",
          color: "#D4AF37",
          fontFamily: "monospace",
          fontSize: 14,
          lineHeight: 1.8,
        }}
      >
        {commitment || "No commitment generated yet"}
      </div>

      <button
        className="btn-primary"
        style={{
          width: "100%",
          marginTop: 22,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
        disabled={!commitment}
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <CheckCircle2 size={18} />
            Copied
          </>
        ) : (
          <>
            <Copy size={18} />
            Copy Commitment
          </>
        )}
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 28,
          borderTop: "1px solid rgba(255,255,255,.05)",
          paddingTop: 20,
        }}
      >
        <div>

          

        </div>

        <div
          style={{
            color: "#D4AF37",
            fontWeight: 700,
          }}
        >
          SHA-256
        </div>

      </div>

    </div>
  );
}