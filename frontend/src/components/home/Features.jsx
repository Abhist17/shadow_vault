import { Coins, Cpu, Fingerprint, KeyRound, ShieldCheck, Ban } from "lucide-react";

const FEATURES = [
  {
    icon: Fingerprint,
    title: "Poseidon2 commitments",
    text: "A ZK-friendly hash binds your secret to one deposit slot. The same hash runs identically in the circuit and the backend.",
  },
  {
    icon: Cpu,
    title: "Noir + UltraHonk",
    text: "Ownership logic lives in a Noir circuit. Barretenberg turns it into a succinct proof in well under a second.",
  },
  {
    icon: ShieldCheck,
    title: "On-chain verification",
    text: "A Soroban contract holds the verification key and runs the real pairing check. Nothing is trusted off-chain.",
  },
  {
    icon: Ban,
    title: "Nullifier replay guard",
    text: "Withdrawing burns a nullifier derived from your secret, so the same proof can never be spent a second time.",
  },
  {
    icon: KeyRound,
    title: "Write-once deposit IDs",
    text: "A deposit slot cannot be overwritten, which stops anyone resetting a live deposit to withdraw it again.",
  },
  {
    icon: Coins,
    title: "Proof-gated withdrawal",
    text: "The vault verifies the proof itself and checks it opens this exact deposit before releasing anything.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section shell">
      <div className="section-head center">
        <p className="eyebrow">Features</p>
        <h2>What the protocol guarantees</h2>
      </div>

      <div className="grid">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <article key={title} className="card card-hover stack">
            <span className="card-icon">
              <Icon size={20} />
            </span>

            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
