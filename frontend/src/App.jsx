import Hero from "./components/Hero";
import DepositCard from "./components/DepositCard";
import ProofCard from "./components/ProofCard";
import StatusTimeline from "./components/StatusTimeline";
import WithdrawCard from "./components/WithdrawCard";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main
      style={{
        background: "#050505",
        color: "white",
      }}
    >
      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          position: "relative",
          padding: "0 20px",
        }}
      >
        <div className="glow" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <ShieldCheck size={72} strokeWidth={1.3} />

          <h1 className="title" style={{ marginTop: 20 }}>
            ShadowVault
          </h1>

          <p
            className="subtitle"
            style={{
              maxWidth: 700,
              margin: "30px auto",
            }}
          >
            Privacy-preserving treasury ownership powered by Noir,
            Ultrahonk and Stellar.
          </p>

          <div
            style={{
              display: "flex",
              gap: 18,
              justifyContent: "center",
              marginTop: 45,
              flexWrap: "wrap",
            }}
          >
            <button className="btn-primary">
              Launch Vault
            </button>

            <button className="btn-secondary">
              View Architecture
            </button>
          </div>

          <div
            style={{
              marginTop: 90,
              color: "#777",
            }}
          >
            <ChevronDown size={32} />
          </div>
        </motion.div>
      </section>

      {/* Features */}

      <section
        className="section"
        style={{
          paddingBottom: 120,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 42,
            marginBottom: 50,
          }}
        >
          Why ShadowVault?
        </h2>

        <div
          className="grid"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
          }}
        >
          <Feature
            icon={<LockKeyhole size={40} />}
            title="Private Ownership"
            text="Ownership is proven with Zero Knowledge instead of revealing identities."
          />

          <Feature
            icon={<ShieldCheck size={40} />}
            title="Verified On Stellar"
            text="Proofs are verified on-chain using Soroban smart contracts."
          />

          <Feature
            icon={<Wallet size={40} />}
            title="Replay Protection"
            text="Nullifiers permanently prevent double withdrawals."
          />
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="card"
      style={{
        padding: 30,
      }}
    >
      <div
        style={{
          marginBottom: 20,
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          marginBottom: 12,
          fontSize: 24,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#9a9a9a",
          lineHeight: 1.8,
        }}
      >
        {text}
      </p>
    </motion.div>
  );
}