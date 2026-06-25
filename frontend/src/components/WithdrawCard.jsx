import { Wallet } from "lucide-react";

export default function WithdrawCard() {
  return (
    <section className="section" style={{ paddingBottom: 120 }}>
      <div className="card" style={{ padding: 40 }}>
        <Wallet size={36} />

        <h2
          style={{
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          Withdraw
        </h2>

        <button className="btn-primary">
          Verify & Withdraw
        </button>

        <p
          style={{
            marginTop: 25,
            color: "#8d8d8d",
          }}
        >
          Replay attacks prevented using nullifiers.
        </p>
      </div>
    </section>
  );
}