import architecture from "../../assets/zk_deposit_system_architecture (1).svg";

export default function Architecture() {
  return (
    <section
      id="architecture"
      style={{
        maxWidth: 1500,
        margin: "120px auto",
        padding: "0 30px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "#D4AF37",
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 12,
        }}
      >
        SYSTEM ARCHITECTURE
      </p>

      <h2
        style={{
          fontSize: 52,
          marginBottom: 20,
        }}
      >
        ShadowVault Architecture
      </h2>

      <p
        style={{
          maxWidth: 850,
          margin: "0 auto 50px",
          color: "#999",
          lineHeight: 1.8,
          fontSize: 18,
        }}
      >
        End-to-end privacy workflow using Poseidon commitments,
        Noir circuits, UltraHonk proof generation and Soroban smart
        contracts on Stellar.
      </p>

      <div
        style={{
          background: "#0F0F0F",
          border: "1px solid rgba(212,175,55,.12)",
          borderRadius: 24,
          padding: 30,
        }}
      >
        <img
          src={architecture}
          alt="ShadowVault Architecture"
          style={{
            width: "100%",
            maxWidth: 1300,
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
    </section>
  );
}