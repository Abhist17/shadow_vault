import { Copy } from "lucide-react";

export default function Commitment() {
  return (
    <div
      style={{
        background: "#101010",
        border: "1px solid #222",
        borderRadius: 18,
        padding: 30,
      }}
    >
      <h2 style={{ marginBottom: 20 }}>
        Commitment
      </h2>

      <div
        style={{
          background: "#181818",
          padding: 18,
          borderRadius: 12,
          wordBreak: "break-all",
          color: "#bfbfbf",
          fontFamily: "monospace",
        }}
      >
        6027956103379247175334154795400619218281914933719309476332502844970033476296
      </div>

      <button
        style={{
          marginTop: 20,
          width: "100%",
          padding: 15,
          background: "white",
          color: "black",
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          fontWeight: 700,
        }}
      >
        <Copy size={18} />

        Copy Commitment
      </button>
    </div>
  );
}