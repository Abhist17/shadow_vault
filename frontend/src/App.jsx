import Navbar from "./components/layout/Navbar";

import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import Architecture from "./components/home/Architecture";

import Deposit from "./components/vault/Deposit";
import Commitment from "./components/vault/Commitment";
import Proof from "./components/vault/Proof";
import Verification from "./components/vault/Verification";
import Withdraw from "./components/vault/Withdraw";
import Timeline from "./components/vault/Timeline";

import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <main
      style={{
        background: "#050505",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <Hero />

      <Features />

      {/* DASHBOARD */}

      <section
        id="dashboard"
        style={{
          maxWidth: 1450,
          margin: "auto",
          padding: "100px 35px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          <p
            style={{
              color: "#D4AF37",
              letterSpacing: 2,
              fontWeight: 700,
            }}
          >
            VAULT CONTROL PANEL
          </p>

          <h2
            style={{
              fontSize: 52,
              marginTop: 15,
            }}
          >
            ShadowVault Dashboard
          </h2>

          <p
            style={{
              color: "#999",
              maxWidth: 700,
              margin: "20px auto",
              lineHeight: 1.8,
            }}
          >
            Generate commitments, deposit assets,
            create zero-knowledge proofs,
            verify ownership and securely withdraw
            using Stellar smart contracts.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))",
            gap: 30,
          }}
        >
          <Deposit />

          <Commitment />

          <Proof />

          <Verification />

          <Withdraw />
        </div>
      </section>

      <Timeline />

      <div id="architecture">
        <Architecture />
      </div>

      <div id="footer">
        <Footer />
      </div>
    </main>
  );
}