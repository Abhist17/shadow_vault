import {
  WalletCards,
  Fingerprint,
  Cpu,
  BadgeCheck,
  ArrowDownToLine,
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  Boxes,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: WalletCards,
    title: "Deposit",
    subtitle: "Vault Entry",
    text: "User deposits assets into the ShadowVault treasury.",
    tech: "Stellar",
  },
  {
    number: "02",
    icon: Fingerprint,
    title: "Commitment",
    subtitle: "Hide Ownership",
    text: "A cryptographic commitment is generated from the private secret.",
    tech: "Poseidon",
  },
  {
    number: "03",
    icon: Cpu,
    title: "ZK Proof",
    subtitle: "Prove Privately",
    text: "Ownership is proven without exposing the user's private secret.",
    tech: "Noir + UltraHonk",
  },
  {
    number: "04",
    icon: BadgeCheck,
    title: "Verify",
    subtitle: "On-chain Validation",
    text: "The proof is verified by the deployed Soroban verifier contract.",
    tech: "Soroban",
  },
  {
    number: "05",
    icon: ArrowDownToLine,
    title: "Withdraw",
    subtitle: "Private Exit",
    text: "Funds are released and the nullifier prevents proof reuse.",
    tech: "Nullifier",
  },
];

const technologies = [
  {
    name: "Stellar",
    type: "Blockchain",
    image: "https://cdn.simpleicons.org/stellar/D4AF37",
  },
  {
    name: "Soroban",
    type: "Smart Contracts",
    image: "https://cdn.simpleicons.org/rust/D4AF37",
  },
  {
    name: "Noir",
    type: "ZK Circuits",
    image: "https://cdn.simpleicons.org/stellar/D4AF37",
  },
  {
    name: "UltraHonk",
    type: "Proof System",
    image: "https://cdn.simpleicons.org/stellar/D4AF37",
  },
  {
    name: "React",
    type: "Frontend",
    image: "https://cdn.simpleicons.org/react/D4AF37",
  },
  {
    name: "Node.js",
    type: "Backend",
    image: "https://cdn.simpleicons.org/nodedotjs/D4AF37",
  },
];

export default function Timeline() {
  return (
    <section
      id="flow"
      style={{
        position: "relative",
        padding: "130px 35px 150px",
        overflow: "hidden",
        background:
          "linear-gradient(180deg,#050505 0%,#0a0907 50%,#050505 100%)",
        scrollMarginTop: 90,
      }}
    >
      {/* BACKGROUND */}

      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: "rgba(212,175,55,.045)",
          filter: "blur(140px)",
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1450,
          margin: "auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            maxWidth: 800,
            margin: "0 auto 90px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              color: "#D4AF37",
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            <LockKeyhole size={16} />

            SHADOWVAULT PROTOCOL
          </div>

          <h2
            style={{
              fontSize: 58,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            From deposit to
            <span style={{ color: "#D4AF37" }}>
              {" "}
              private withdrawal.
            </span>
          </h2>

          <p
            style={{
              color: "#8d8d8d",
              fontSize: 18,
              lineHeight: 1.8,
              margin: "25px auto 0",
              maxWidth: 670,
            }}
          >
            One private ownership lifecycle. Five cryptographic
            and on-chain stages.
          </p>
        </div>

        {/* WORKFLOW PIPELINE */}

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns:
              "1fr 55px 1fr 55px 1fr 55px 1fr 55px 1fr",
            alignItems: "stretch",
          }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                style={{
                  display: "contents",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    minHeight: 390,
                    padding: "32px 27px",
                    borderRadius: 24,
                    background:
                      index === 2
                        ? "linear-gradient(145deg,#17140c,#0c0c0c)"
                        : "#0c0c0c",
                    border:
                      index === 2
                        ? "1px solid rgba(212,175,55,.5)"
                        : "1px solid rgba(212,175,55,.16)",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all .3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-10px)";

                    e.currentTarget.style.borderColor =
                      "rgba(212,175,55,.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";

                    e.currentTarget.style.borderColor =
                      index === 2
                        ? "rgba(212,175,55,.5)"
                        : "rgba(212,175,55,.16)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#D4AF37",
                        fontWeight: 800,
                        fontSize: 13,
                        letterSpacing: 2,
                      }}
                    >
                      STEP {step.number}
                    </span>

                    <span
                      style={{
                        color: "#444",
                        fontWeight: 800,
                        fontSize: 30,
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <div
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 18,
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(212,175,55,.09)",
                      color: "#D4AF37",
                      marginTop: 35,
                    }}
                  >
                    <Icon size={29} strokeWidth={1.7} />
                  </div>

                  <p
                    style={{
                      color: "#777",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      margin: "28px 0 8px",
                    }}
                  >
                    {step.subtitle}
                  </p>

                  <h3
                    style={{
                      fontSize: 27,
                      margin: 0,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: "#929292",
                      lineHeight: 1.7,
                      fontSize: 14,
                      marginTop: 18,
                    }}
                  >
                    {step.text}
                  </p>

                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 25,
                    }}
                  >
                    <div
                      style={{
                        height: 1,
                        background: "rgba(255,255,255,.06)",
                        marginBottom: 20,
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#D4AF37",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      <ShieldCheck size={15} />

                      {step.tech}
                    </div>
                  </div>
                </div>

                {index !== steps.length - 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: 1,
                        background:
                          "linear-gradient(90deg,rgba(212,175,55,.2),#D4AF37,rgba(212,175,55,.2))",
                      }}
                    />

                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: "#11100c",
                        border:
                          "1px solid rgba(212,175,55,.35)",
                        display: "grid",
                        placeItems: "center",
                        color: "#D4AF37",
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      <ArrowRight size={18} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* TECH STACK */}

        <div
          style={{
            marginTop: 140,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              color: "#D4AF37",
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            <Boxes size={17} />

            BUILT WITH
          </div>

          <h2
            style={{
              fontSize: 48,
              margin: 0,
            }}
          >
            ShadowVault Tech Stack
          </h2>

          <p
            style={{
              color: "#888",
              maxWidth: 650,
              margin: "20px auto 60px",
              lineHeight: 1.8,
              fontSize: 16,
            }}
          >
            Privacy infrastructure powered by zero-knowledge
            cryptography and Stellar smart contracts.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(6, minmax(0, 1fr))",
              gap: 20,
            }}
          >
            {technologies.map((technology) => (
              <Tech
                key={technology.name}
                image={technology.image}
                name={technology.name}
                type={technology.type}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM PROTOCOL BAR */}

        <div
          style={{
            marginTop: 70,
            border: "1px solid rgba(212,175,55,.15)",
            borderRadius: 18,
            background: "rgba(15,15,15,.8)",
            padding: "22px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 13,
            }}
          >
            <ShieldCheck size={21} color="#D4AF37" />

            <div>
              <strong>
                Privacy-preserving ownership lifecycle
              </strong>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#777",
                  fontSize: 13,
                }}
              >
                Secrets remain private throughout the
                verification process.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 30,
              color: "#D4AF37",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            <span>NOIR</span>
            <span>ULTRAHONK</span>
            <span>SOROBAN</span>
            <span>STELLAR</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tech({ image, name, type }) {
  return (
    <div
      style={{
        minHeight: 190,
        borderRadius: 22,
        background:
          "linear-gradient(145deg,#0d0d0d,#11100c)",
        border: "1px solid rgba(212,175,55,.14)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        transition: "all .3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-8px)";

        e.currentTarget.style.borderColor =
          "rgba(212,175,55,.6)";

        e.currentTarget.style.background =
          "linear-gradient(145deg,#17140b,#0d0d0d)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";

        e.currentTarget.style.borderColor =
          "rgba(212,175,55,.14)";

        e.currentTarget.style.background =
          "linear-gradient(145deg,#0d0d0d,#11100c)";
      }}
    >
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: 18,
          display: "grid",
          placeItems: "center",
          background: "rgba(212,175,55,.06)",
          border: "1px solid rgba(212,175,55,.1)",
          marginBottom: 22,
        }}
      >
        <img
          src={image}
          alt={`${name} logo`}
          style={{
            width: 45,
            height: 45,
            objectFit: "contain",
          }}
        />
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: 20,
        }}
      >
        {name}
      </h3>

      <p
        style={{
          margin: "8px 0 0",
          color: "#777",
          fontSize: 13,
        }}
      >
        {type}
      </p>
    </div>
  );
}