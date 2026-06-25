import { Database } from "lucide-react";

export default function DepositCard() {
  return (
    <section className="section" style={{ paddingBottom: 120 }}>
      <div
        className="card"
        style={{
          padding: 40,
        }}
      >
        <Database size={36} />

        <h2
          style={{
            marginTop: 20,
            marginBottom: 25,
          }}
        >
          Deposit
        </h2>

        <div
          style={{
            display: "grid",
            gap: 20,
          }}
        >
          <input placeholder="Secret" />

          <input placeholder="Deposit ID" />

          <input placeholder="Amount" />

          <button className="btn-primary">
            Generate Commitment
          </button>
        </div>
      </div>
    </section>
  );
}