import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        backdropFilter: "blur(18px)",
        background: "rgba(5,5,5,.75)",
        borderBottom: "1px solid rgba(212,175,55,.12)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "auto",
          height: 90,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 35px",
        }}
      >
        {/* Logo Text */}

        <h2
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: 1,
          }}
        >
          Shadow
          <span
            style={{
              color: "#D4AF37",
            }}
          >
            Vault
          </span>
        </h2>

        {/* Navigation */}

        <div
          style={{
            display: "flex",
            gap: 40,
          }}
        >
          <a href="#">Home</a>
          <a href="#dashboard">Vault</a>
          <a href="#architecture">Architecture</a>
          <a href="#footer">About</a>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <ShieldCheck size={18} />
          Launch Vault
        </motion.button>
      </div>
    </motion.nav>
  );
}