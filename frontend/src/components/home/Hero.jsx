import { ArrowRight, ArrowUpRight } from "lucide-react";

import Scramble from "../ui/Scramble";
import Words from "../ui/Words";

const STATS = [
  { value: "0", label: "Secrets revealed" },
  { value: "<1s", label: "Proving time" },
  { value: "5", label: "Stages" },
  { value: "1×", label: "Nullifier spend" },
];

const COMMITMENT = "0x8f3ad41c9e7b2506f4a1de83b9c07e5218aa6d3f";
const NULLIFIER = "0x21c94e7f0ab63d85219cef4470a8b31d6e05f2ac";

export default function Hero() {
  function go(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="top" className="hero">
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="label hero-late" style={{ "--d": "0.5s" }}>
              <span className="tick tick-live" />
              Stellar · Noir · UltraHonk
            </span>

            <h1>
              <Words text="Prove ownership." />
              <Words text="Reveal nothing." dim offset={2} />
            </h1>

            <p className="lede hero-late" style={{ "--d": "0.6s" }}>
              ShadowVault stores deposits as Poseidon2 commitments, not balances. A Noir circuit
              proves you can open one; a Soroban contract verifies it on-chain. The secret never
              leaves your machine.
            </p>

            <div className="hero-actions hero-late" style={{ "--d": "0.7s" }}>
              <button className="btn btn-primary" onClick={() => go("vault")}>
                Open the vault
                <ArrowRight size={15} />
              </button>

              <a
                className="btn btn-ghost"
                href="https://github.com/Abhist17/shadow_vault"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* A live readout rather than a logo: it states what the product does
              in its own vocabulary, and the scramble makes the point wordlessly. */}
          <div className="readout hero-late" style={{ "--d": "0.8s" }}>
            <div className="readout-top">
              <span className="label">Vault entry</span>
              <span className="label">
                <span className="tick tick-live" />
                Live
              </span>
            </div>

            <dl className="readout-body">
              <div className="rrow">
                <dt>secret</dt>
                <dd className="faint">••••••••••••••••</dd>
              </div>
              <div className="rrow">
                <dt>deposit_id</dt>
                <dd>1042</dd>
              </div>
              <div className="rrow rrow-accent">
                <dt>commitment</dt>
                <dd>
                  <Scramble text={COMMITMENT} speed={22} />
                </dd>
              </div>
              <div className="rrow rrow-accent">
                <dt>nullifier</dt>
                <dd>
                  <Scramble text={NULLIFIER} speed={26} />
                </dd>
              </div>
              <div className="rrow">
                <dt>on_chain</dt>
                <dd className="mono" style={{ color: "var(--ok)" }}>
                  verified
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="stats hero-late" style={{ "--d": "0.9s" }}>
          {STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <b>
                <Scramble text={stat.value} charset="digits" speed={45} />
              </b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
