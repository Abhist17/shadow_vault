import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";

import Deposit from "../components/vault/Deposit";
import Commitment from "../components/vault/Commitment";
import Proof from "../components/vault/Proof";
import Verification from "../components/vault/Verification";
import Withdraw from "../components/vault/Withdraw";

import Architecture from "../components/home/Architecture";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <section
        style={{
          maxWidth: 1300,
          margin: "auto",
          padding: "80px 30px",
        }}
      >
        <h2
          style={{
            fontSize: 48,
            marginBottom: 40,
          }}
        >
          ShadowVault Dashboard
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 30,
          }}
        >
          <Deposit />
          <Commitment />

          <Proof />
          <Verification />
        </div>

        <div
          style={{
            marginTop: 30,
          }}
        >
          <Withdraw />
        </div>
      </section>

      <Architecture />

      <Footer />
    </>
  );
}