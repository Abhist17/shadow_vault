import { ArrowDownToLine, BadgeCheck, Cpu, Fingerprint, LockKeyhole, WalletCards } from "lucide-react";

import Reveal from "../ui/Reveal";
import { useSpotlight } from "../../hooks/useSpotlight";

const STAGES = [
  {
    icon: WalletCards,
    title: "Deposit",
    subtitle: "Vault entry",
    text: "A commitment is recorded against a write-once deposit ID.",
    tech: "Stellar",
  },
  {
    icon: Fingerprint,
    title: "Commitment",
    subtitle: "Hide ownership",
    text: "Poseidon2(secret, depositId) replaces any public record of who owns it.",
    tech: "Poseidon2",
  },
  {
    icon: Cpu,
    title: "ZK proof",
    subtitle: "Prove privately",
    text: "A Noir circuit proves you can open the commitment without revealing the secret.",
    tech: "Noir · UltraHonk",
  },
  {
    icon: BadgeCheck,
    title: "Verify",
    subtitle: "On-chain check",
    text: "The Soroban verifier runs the pairing check against its stored key.",
    tech: "Soroban",
  },
  {
    icon: ArrowDownToLine,
    title: "Withdraw",
    subtitle: "Private exit",
    text: "The nullifier is burned, so the proof can never be replayed.",
    tech: "Nullifier",
  },
];

const STACK = [
  { name: "Stellar", type: "Blockchain", slug: "stellar" },
  { name: "Rust", type: "Smart contracts", slug: "rust" },
  { name: "Noir", type: "ZK circuits", slug: "aztec" },
  { name: "React", type: "Frontend", slug: "react" },
  { name: "Node.js", type: "Backend", slug: "nodedotjs" },
  { name: "Vite", type: "Build", slug: "vite" },
];

export default function Protocol() {
  const onSpotlight = useSpotlight();

  return (
    <section id="flow" className="section protocol">
      <div className="shell">
        <Reveal className="section-head center">
          <p className="eyebrow">
            <LockKeyhole size={14} />
            ShadowVault protocol
          </p>
          <h2>
            From deposit to <span className="shine">private withdrawal</span>
          </h2>
          <p className="lede">One ownership lifecycle, five cryptographic and on-chain stages.</p>
        </Reveal>

        {/* Auto-fit grid rather than a fixed track count, so the stages wrap
            instead of overflowing the viewport on anything under a wide desktop. */}
        <ol className="stages">
          {STAGES.map((stage, index) => (
            <Reveal key={stage.title} as="li" delay={index * 0.07}>
              <div className="card card-hover stage" onMouseMove={onSpotlight}>
                <div className="row-between" style={{ width: "100%" }}>
                  <span className="eyebrow">Stage {String(index + 1).padStart(2, "0")}</span>
                  <span className="stage-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <span className="card-icon">
                  <stage.icon size={20} strokeWidth={1.8} />
                </span>

                <div className="stack" style={{ gap: "0.35rem" }}>
                  <p className="stage-sub">{stage.subtitle}</p>
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </div>

                <span className="pill stage-tech">{stage.tech}</span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="section-head center" style={{ marginTop: "var(--section-y)" }}>
          <p className="eyebrow">Built with</p>
          <h2>The stack underneath</h2>
        </Reveal>
      </div>

      {/* Full-bleed on purpose: the marquee reads as a moving band across the
          page, so it is deliberately outside the .shell max-width. */}
      <div className="marquee">
        <div className="marquee-track">
          {[...STACK, ...STACK].map((item, index) => (
            <article
              /* The second run is a visual duplicate, so the index is the key. */
              key={`${item.name}-${index}`}
              className="card card-hover tech"
              onMouseMove={onSpotlight}
              aria-hidden={index >= STACK.length}
            >
              <img
                src={`https://cdn.simpleicons.org/${item.slug}/d4af37`}
                alt=""
                aria-hidden="true"
                width="36"
                height="36"
                loading="lazy"
              />
              <h3>{item.name}</h3>
              <p className="faint">{item.type}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
