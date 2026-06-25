import { ShieldCheck, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShieldCheck size={70} />

        <h1 className="title">
          ShadowVault
        </h1>

        <p
          className="subtitle"
          style={{
            maxWidth: 700,
            margin: "25px auto",
          }}
        >
          Private treasury ownership powered by Noir,
          Ultrahonk and Stellar.
        </p>

        <button className="btn-primary">
          Launch Vault
        </button>

        <div
          style={{
            marginTop: 80,
            color: "#666",
          }}
        >
          <ChevronDown />
        </div>
      </motion.div>
    </section>
  );
}