import { Shield } from "lucide-react";

export default function ProofCard() {
  return (
    <section className="section" style={{ paddingBottom: 120 }}>
      <div className="card" style={{ padding: 40 }}>
        <Shield size={36} />

        <h2
          style={{
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          Zero Knowledge Proof
        </h2>

        <button className="btn-primary">
          Generate Proof
        </button>

        <div
          style={{
            marginTop: 35,
            color: "#8d8d8d",
            lineHeight: 2,
          }}
        >
          Commitment

          <br />

          Verification Key

          <br />

          Public Inputs

          <br />

          Proof Generated
        </div>
      </div>
    </section>
  );
}