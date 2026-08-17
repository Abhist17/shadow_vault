import { Database, Eye, Fingerprint, LockKeyhole, ShieldAlert, ShieldCheck } from "lucide-react";

import Reveal from "../ui/Reveal";
import { useSpotlight } from "../../hooks/useSpotlight";

const PROBLEMS = [
  {
    icon: Eye,
    title: "Public ownership",
    text: "On-chain vaults expose which address owns what. Balances and history are permanently readable by anyone.",
  },
  {
    icon: Database,
    title: "Traceable treasuries",
    text: "Every movement links back to the organisation that made it, turning a ledger into a competitive intelligence feed.",
  },
  {
    icon: ShieldAlert,
    title: "Privacy kills verification",
    text: "The usual fix is to hide the data off-chain, which also removes anyone's ability to check that it is correct.",
  },
];

const SOLUTIONS = [
  {
    icon: Fingerprint,
    title: "Commitments, not balances",
    text: "The chain stores Poseidon2(secret, depositId). It reveals that a deposit exists and nothing about who made it.",
  },
  {
    icon: LockKeyhole,
    title: "Ownership proved in zero knowledge",
    text: "A Noir circuit proves you can open the commitment. The secret stays on your machine the entire time.",
  },
  {
    icon: ShieldCheck,
    title: "Checked by the chain itself",
    text: "A Soroban contract runs the UltraHonk verifier and burns a nullifier, so a proof works exactly once.",
  },
];

export default function About() {
  return (
    <section id="about" className="section shell">
      <Reveal className="section-head center">
        <p className="eyebrow">Why ShadowVault</p>
        <h2>
          Blockchains are transparent.
          <br />
          <span className="shine">Your treasury shouldn't be.</span>
        </h2>
      </Reveal>

      <div className="compare">
        <Column label="The problem" tone="problem" items={PROBLEMS} />
        <Column label="The approach" tone="solution" items={SOLUTIONS} />
      </div>
    </section>
  );
}

function Column({ label, tone, items }) {
  const onSpotlight = useSpotlight();

  return (
    <div className="stack">
      <p className={`compare-label compare-label-${tone}`}>{label}</p>

      <div className="stack">
        {items.map(({ icon: Icon, title, text }, index) => (
          <Reveal key={title} delay={index * 0.08}>
            <article
              className={`card card-hover compare-item compare-item-${tone}`}
              onMouseMove={onSpotlight}
            >
              <span className={`card-icon card-icon-${tone}`}>
                <Icon size={20} />
              </span>

              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
