import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <ShieldCheck
          size={70}
          strokeWidth={1.2}
        />

        <h1
          style={{
            fontSize: "90px",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          ShadowVault
        </h1>

        <p
          style={{
            maxWidth: 750,
            color: "#999",
            lineHeight: 1.8,
            fontSize: 20,
          }}
        >
          Privacy-preserving treasury ownership using
          Noir, Ultrahonk and Soroban smart contracts
          on Stellar.
        </p>

        <button
          style={{
            marginTop: 50,
            padding: "18px 38px",
            borderRadius: 14,
            background: "white",
            color: "black",
            border: 0,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Launch Vault
        </button>
      </motion.div>
    </section>
  );
}