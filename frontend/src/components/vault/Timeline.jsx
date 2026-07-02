import {
  Wallet,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  ArrowDownCircle,
} from "lucide-react";

const steps = [
  {
    icon: <Wallet size={28} />,
    title: "Deposit",
    desc: "User deposits assets into the private vault.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Commitment",
    desc: "Generate a Poseidon commitment from the user's secret.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Zero-Knowledge Proof",
    desc: "Noir + UltraHonk generate a privacy-preserving proof.",
  },
  {
    icon: <BadgeCheck size={28} />,
    title: "Verify",
    desc: "Proof is verified by the Soroban smart contract.",
  },
  {
    icon: <ArrowDownCircle size={28} />,
    title: "Withdraw",
    desc: "Funds are released and the nullifier prevents reuse.",
  },
];

export default function Timeline() {
  return (
    <section
      id="flow"
      style={{
        maxWidth: 1450,
        margin: "120px auto",
        padding: "0 40px",
      }}
    >
      <p
        style={{
          color: "#D4AF37",
          textAlign: "center",
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        PROJECT FLOW
      </p>

      <h2
        style={{
          fontSize: 52,
          textAlign: "center",
          marginTop: 15,
          marginBottom: 70,
        }}
      >
        How ShadowVault Works
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 18,
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 220,
                minHeight: 220,
                background: "#101010",
                border: "1px solid rgba(212,175,55,.15)",
                borderRadius: 24,
                padding: 25,
                textAlign: "center",
                transition: ".35s",
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  background: "rgba(212,175,55,.08)",
                  color: "#D4AF37",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 20px",
                }}
              >
                {step.icon}
              </div>

              <div
                style={{
                  color: "#D4AF37",
                  fontWeight: 700,
                  marginBottom: 12,
                  fontSize: 18,
                }}
              >
                {step.title}
              </div>

              <p
                style={{
                  color: "#AFAFAF",
                  lineHeight: 1.7,
                  fontSize: 14,
                }}
              >
                {step.desc}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <div
                style={{
                  fontSize: 34,
                  color: "#D4AF37",
                  margin: "0 12px",
                  fontWeight: "bold",
                }}
              >
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}