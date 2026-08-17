import Reveal from "../ui/Reveal";

const PROBLEMS = [
  {
    title: "Public ownership",
    text: "On-chain vaults expose which address owns what. Balances and history stay readable by anyone, permanently.",
  },
  {
    title: "Traceable treasuries",
    text: "Every movement links back to the organisation that made it, turning a ledger into a competitive intelligence feed.",
  },
  {
    title: "Privacy kills verification",
    text: "The usual fix is to hide the data off-chain, which also removes anyone's ability to check that it is correct.",
  },
];

const SOLUTIONS = [
  {
    title: "Commitments, not balances",
    text: "The chain stores Poseidon2(secret, depositId). It reveals that a deposit exists and nothing about who made it.",
  },
  {
    title: "Ownership proved in zero knowledge",
    text: "A Noir circuit proves you can open the commitment. The secret stays on your machine the entire time.",
  },
  {
    title: "Checked by the chain itself",
    text: "A Soroban contract runs the UltraHonk verifier and burns a nullifier, so a proof works exactly once.",
  },
];

export default function About() {
  return (
    <section id="why" className="section shell">
      <Reveal className="sec-head">
        <span className="label">[01] — Why</span>
        <h2>Blockchains are transparent. Your treasury shouldn't be.</h2>
      </Reveal>

      <Reveal className="compare">
        <Column label="The problem" tone="bad" items={PROBLEMS} />
        <Column label="The approach" tone="ok" items={SOLUTIONS} />
      </Reveal>
    </section>
  );
}

function Column({ label, tone, items }) {
  return (
    <div className="compare-col">
      <div className="compare-head">
        <span className="tick" style={{ background: `var(--${tone})` }} />
        <span className="label" style={{ color: `var(--${tone})` }}>
          {label}
        </span>
      </div>

      {items.map((item, index) => (
        <article key={item.title} className="item">
          <span className="item-num">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
