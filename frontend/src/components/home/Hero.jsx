import { motion } from "framer-motion";
import {
  ArrowRight,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import logo from "../../assets/sv1.jpeg";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background:
          "linear-gradient(180deg,#050505 0%,#090909 40%,#0d0d0d 100%)",
        borderBottom: "1px solid rgba(212,175,55,.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          width: "100%",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "1.05fr .95fr",
          gap: 60,
          alignItems: "center",
          padding: "100px 50px",
        }}
      >
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(212,175,55,.20)",
              background: "rgba(212,175,55,.04)",
              color: "#D4AF37",
              marginBottom: 35,
              fontWeight: 600,
            }}
          >
            <Sparkles size={16} />

            Powered by Zero Knowledge
          </div>

          <h1
            style={{
              fontSize: 82,
              lineHeight: 1,
              marginBottom: 30,
              fontWeight: 900,
            }}
          >
            Privacy

            <br />

            <span
              style={{
                color: "#D4AF37",
              }}
            >
              Verified
            </span>

            <br />

            On Stellar.
          </h1>

          <p
            style={{
              color: "#AFAFAF",
              fontSize: 21,
              lineHeight: 1.9,
              maxWidth: 580,
            }}
          >
            ShadowVault enables confidential treasury
            ownership through Noir, Ultrahonk and
            Soroban smart contracts while keeping
            user identity completely private.
          </p>

          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 45,
            }}
          >
            <button
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "18px 30px",
              }}
            >
              Launch Vault

              <ArrowRight size={18} />
            </button>

            <button
              style={{
                padding: "18px 30px",
                background: "transparent",
                color: "white",
                border: "1px solid #2a2a2a",
                borderRadius: 14,
                fontWeight: 600,
              }}
            >
              GitHub
            </button>
          </div>

          <div
            style={{
              width: 180,
              height: 3,
              background: "#D4AF37",
              borderRadius: 999,
              marginTop: 45,
            }}
          />

          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 35,
              flexWrap: "wrap",
            }}
          >
            <Badge icon={<ShieldCheck size={17} />} text="Stellar" />

            <Badge icon={<Lock size={17} />} text="Noir" />

            <Badge icon="⚡" text="Ultrahonk" />

            <Badge icon="🔒" text="Soroban" />
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: .8,
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
              width: 620,
              maxWidth: "100%",
              borderRadius: 32,
              opacity: .96,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ icon, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 18px",
        borderRadius: 999,
        background: "#111",
        border: "1px solid #202020",
        color: "#D4AF37",
        fontWeight: 600,
      }}
    >
      {icon}
      {text}
    </div>
  );
}