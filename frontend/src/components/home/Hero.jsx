import { motion } from "framer-motion";
import { ArrowRight, Code2, Lock, ShieldCheck, Sparkles } from "lucide-react";

import logo from "../../assets/sv1.jpeg";

const BADGES = [
  { icon: <ShieldCheck size={15} />, label: "Stellar" },
  { icon: <Lock size={15} />, label: "Noir" },
  { icon: <Sparkles size={15} />, label: "UltraHonk" },
  { icon: <ShieldCheck size={15} />, label: "Soroban" },
];

const STATS = [
  { value: "0", label: "Secrets revealed" },
  { value: "<1s", label: "Proving time" },
  { value: "5", label: "Pipeline stages" },
  { value: "1×", label: "Nullifier spend" },
];

const EASE = [0.16, 1, 0.3, 1];

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
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="pill">
            <span className="dot-live" aria-hidden="true" />
            Powered by zero knowledge
          </span>

          <h1>
            Privacy,
            <br />
            <span className="shine">verified</span> on Stellar.
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
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
        >
          {/* Decorative orbits; the image itself carries no meaning either. */}
          <span className="orbit orbit-2" aria-hidden="true" />
          <span className="orbit orbit-1" aria-hidden="true" />

          <motion.img
            src={logo}
            alt=""
            aria-hidden="true"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <motion.div
        className="shell"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
      >
        <div className="hero-stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
