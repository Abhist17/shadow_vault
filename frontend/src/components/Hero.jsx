import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import logo from "../../assets/sv1.jpeg";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "120px 30px 90px",
      }}
    >
      {/* GOLD GLOW */}

      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: "#D4AF37",
          filter: "blur(220px)",
          opacity: 0.12,
          left: "50%",
          top: -180,
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        style={{
          maxWidth: 1300,
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* LEFT */}

        <div>
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: .2,
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(212,175,55,.25)",
              background: "rgba(255,255,255,.04)",
              marginBottom: 25,
            }}
          >
            <Sparkles size={16} color="#D4AF37" />

            <span
              style={{
                color: "#D4AF37",
                fontWeight: 600,
              }}
            >
              Privacy Powered by Zero Knowledge
            </span>
          </motion.div>

          <h1
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              marginBottom: 25,
            }}
          >
            The Future of
            <br />

            <span
              style={{
                color: "#D4AF37",
              }}
            >
              Private Treasury
            </span>
          </h1>

          <p
            style={{
              maxWidth: 560,
              fontSize: 20,
              color: "#AFAFAF",
              lineHeight: 1.9,
            }}
          >
            ShadowVault enables confidential deposits,
            zero-knowledge ownership proofs and secure
            withdrawals on Stellar using Noir and
            Ultrahonk.
          </p>

          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 40,
            }}
          >
            <button
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Launch Vault

              <ArrowRight size={18} />
            </button>

            <button
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid #333",
                padding: "15px 28px",
                borderRadius: 14,
              }}
            >
              View Demo
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: 35,
              marginTop: 50,
            }}
          >
            <Feature
              icon={<ShieldCheck />}
              title="Stellar"
            />

            <Feature
              icon={<Lock />}
              title="Noir"
            />

            <Feature
              icon={<Sparkles />}
              title="Ultrahonk"
            />
          </div>
        </div>

        {/* RIGHT */}

        <motion.div
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
          }}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="ShadowVault"
            style={{
              width: 520,
              borderRadius: 40,
              boxShadow:
                "0 0 120px rgba(212,175,55,.25)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Feature({ icon, title }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: "#D4AF37",
        fontWeight: 700,
      }}
    >
      {icon}

      {title}
    </div>
  );
}