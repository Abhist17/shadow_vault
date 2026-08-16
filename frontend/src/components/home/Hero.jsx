import { motion } from "framer-motion";
import { ArrowRight, Code2, Lock, ShieldCheck, Sparkles } from "lucide-react";

import logo from "../../assets/sv1.jpeg";

const BADGES = [
  { icon: <ShieldCheck size={15} />, label: "Stellar" },
  { icon: <Lock size={15} />, label: "Noir" },
  { icon: <Sparkles size={15} />, label: "UltraHonk" },
  { icon: <ShieldCheck size={15} />, label: "Soroban" },
];

export default function Hero() {
  function go(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="top" className="hero">
      <div className="shell hero-grid">
        <motion.div
          className="stack hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.68, 0.35, 1] }}
        >
          <span className="pill">
            <Sparkles size={14} />
            Powered by zero knowledge
          </span>

          <h1>
            Privacy,
            <br />
            <span className="gold">verified</span> on Stellar.
          </h1>

          <p className="lede">
            ShadowVault records deposits as Poseidon2 commitments instead of public balances. Prove
            you own one with a zero-knowledge proof, verified on-chain by a Soroban contract — the
            secret never leaves your machine.
          </p>

          <div className="row hero-actions">
            <button className="btn btn-primary" onClick={() => go("vault")}>
              Launch the vault
              <ArrowRight size={16} />
            </button>

            <a
              className="btn btn-ghost"
              href="https://github.com/Abhist17/shadow_vault"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 size={16} />
              View source
            </a>
          </div>

          <div className="row hero-badges">
            {BADGES.map((badge) => (
              <span key={badge.label} className="pill">
                {badge.icon}
                {badge.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.68, 0.35, 1] }}
        >
          <img src={logo} alt="" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
