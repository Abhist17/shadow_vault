import {
  Eye,
  Database,
  ShieldAlert,
  ShieldCheck,
  LockKeyhole,
  Fingerprint,
} from "lucide-react";

const problems = [
  {
    icon: <Eye size={24} />,
    title: "Public Ownership",
    text: "Traditional on-chain vaults expose wallet addresses and asset ownership publicly.",
  },
  {
    icon: <Database size={24} />,
    title: "Transparent Treasury State",
    text: "Treasury activity can be traced directly back to users and organizations.",
  },
  {
    icon: <ShieldAlert size={24} />,
    title: "Privacy vs Verification",
    text: "Hiding ownership usually makes trustless on-chain verification difficult.",
  },
];

const solutions = [
  {
    icon: <Fingerprint size={24} />,
    title: "Cryptographic Commitments",
    text: "ShadowVault stores a commitment instead of directly exposing the user's secret or identity.",
  },
  {
    icon: <LockKeyhole size={24} />,
    title: "Zero-Knowledge Ownership",
    text: "Noir and UltraHonk prove ownership without revealing the private secret.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Verified on Stellar",
    text: "Soroban verifies the proof and nullifiers prevent repeated withdrawals.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        maxWidth: 1450,
        margin: "0 auto",
        padding: "120px 35px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 850,
          margin: "0 auto 70px",
        }}
      >
        <p
          style={{
            color: "#D4AF37",
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 14,
          }}
        >
          WHY SHADOWVAULT?
        </p>

        <h2
          style={{
            fontSize: 54,
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Blockchain is transparent.
          <br />

          <span style={{ color: "#D4AF37" }}>
            Ownership doesn't have to be.
          </span>
        </h2>

        <p
          style={{
            color: "#999",
            fontSize: 18,
            lineHeight: 1.8,
            maxWidth: 760,
            margin: "28px auto 0",
          }}
        >
          ShadowVault introduces private treasury ownership while
          preserving trustless verification on Stellar.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
        }}
      >
        <div
          style={{
            background: "#0D0D0D",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 26,
            padding: 38,
          }}
        >
          <p
            style={{
              color: "#888",
              fontWeight: 700,
              letterSpacing: 2,
              marginTop: 0,
            }}
          >
            THE PROBLEM
          </p>

          <h3
            style={{
              fontSize: 34,
              marginTop: 14,
              marginBottom: 35,
            }}
          >
            Privacy disappears on-chain.
          </h3>

          {problems.map((item) => (
            <InfoCard
              key={item.title}
              {...item}
            />
          ))}
        </div>

        <div
          style={{
            background:
              "linear-gradient(145deg,#0D0D0D,#17140B)",
            border: "1px solid rgba(212,175,55,.3)",
            borderRadius: 26,
            padding: 38,
          }}
        >
          <p
            style={{
              color: "#D4AF37",
              fontWeight: 700,
              letterSpacing: 2,
              marginTop: 0,
            }}
          >
            THE SHADOWVAULT SOLUTION
          </p>

          <h3
            style={{
              fontSize: 34,
              marginTop: 14,
              marginBottom: 35,
            }}
          >
            Prove ownership. Reveal nothing.
          </h3>

          {solutions.map((item) => (
            <InfoCard
              key={item.title}
              {...item}
              gold
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, text, gold = false }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 18,
        padding: "22px 0",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          minWidth: 48,
          borderRadius: 14,
          display: "grid",
          placeItems: "center",
          background: gold
            ? "rgba(212,175,55,.1)"
            : "rgba(255,255,255,.05)",
          color: gold ? "#D4AF37" : "#AAA",
        }}
      >
        {icon}
      </div>

      <div>
        <h4
          style={{
            margin: "0 0 8px",
            fontSize: 18,
          }}
        >
          {title}
        </h4>

        <p
          style={{
            margin: 0,
            color: "#999",
            lineHeight: 1.7,
            fontSize: 15,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}