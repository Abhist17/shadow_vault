import Reveal from "../ui/Reveal";
import Scramble from "../ui/Scramble";

const STAGES = [
  {
    title: "Deposit",
    text: "A commitment is recorded against a write-once deposit ID.",
    tech: "Stellar",
  },
  {
    title: "Commitment",
    text: "Poseidon2(secret, depositId) replaces any public record of who owns it.",
    tech: "Poseidon2",
  },
  {
    title: "Proof",
    text: "A Noir circuit proves you can open the commitment without revealing the secret.",
    tech: "Noir · UltraHonk",
  },
  {
    title: "Verify",
    text: "The Soroban verifier runs the pairing check against its stored key.",
    tech: "Soroban",
  },
  {
    title: "Withdraw",
    text: "The nullifier is burned, so the proof can never be replayed.",
    tech: "Nullifier",
  },
];

const STACK = [
  { name: "Stellar", slug: "stellar" },
  { name: "Rust", slug: "rust" },
  { name: "Noir", slug: "aztec" },
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Vite", slug: "vite" },
];

export default function Protocol() {
  return (
    <section id="flow" className="section">
      <div className="shell">
        <Reveal className="sec-head">
          <span className="label">[03] — Protocol</span>
          <h2>One lifecycle, five stages.</h2>
        </Reveal>

        {/* A table rather than a card grid: five ordered steps are a list, and
            drawing them as one keeps the eye moving down instead of scanning. */}
        <Reveal as="ol" className="stages">
          {STAGES.map((stage, index) => (
            <li key={stage.title} className="stage">
              <span className="stage-i">{String(index + 1).padStart(2, "0")}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
              <span className="stage-tech">
                <Scramble text={stage.tech} trigger="hover" speed={20} />
              </span>
            </li>
          ))}
        </Reveal>
      </div>

      {/* Full-bleed on purpose — it reads as a band across the page. */}
      <div className="marquee" style={{ marginTop: "var(--sec)" }}>
        <div className="marquee-track">
          {[...STACK, ...STACK].map((item, index) => (
            <span
              /* The second run is a visual duplicate, so index is the key. */
              key={`${item.name}-${index}`}
              className="brand"
              aria-hidden={index >= STACK.length}
            >
              <img
                src={`https://cdn.simpleicons.org/${item.slug}/ffffff`}
                alt=""
                aria-hidden="true"
                width="18"
                height="18"
                loading="lazy"
              />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
