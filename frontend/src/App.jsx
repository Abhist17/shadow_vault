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

      <section
        style={{
          maxWidth: "1400px",
          margin: "80px auto",
          padding: "0 30px",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          ShadowVault Dashboard
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(450px,1fr))",
            gap: "30px",
          }}
        >
          <Deposit />
          <Commitment />

          <Proof />
          <Verification />
        </div>

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <Withdraw />
        </div>
      </section>

      <Timeline />

      <Architecture />

      <Footer />
    </main>
  );
}