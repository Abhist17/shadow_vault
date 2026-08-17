import Reveal from "../ui/Reveal";

const FEATURES = [
  {
    title: "Poseidon2 commitments",
    text: "A ZK-friendly hash binds your secret to one deposit slot. The same hash runs identically in the circuit and the backend.",
  },
  {
    title: "Noir + UltraHonk",
    text: "Ownership logic lives in a Noir circuit. Barretenberg turns it into a succinct proof in well under a second.",
  },
  {
    title: "On-chain verification",
    text: "A Soroban contract holds the verification key and runs the real pairing check. Nothing is trusted off-chain.",
  },
  {
    title: "Nullifier replay guard",
    text: "Withdrawing burns a nullifier derived from your secret, so the same proof can never be spent a second time.",
  },
  {
    title: "Write-once deposit IDs",
    text: "A deposit slot cannot be overwritten, which stops anyone resetting a live deposit to withdraw it again.",
  },
  {
    title: "Proof-gated withdrawal",
    text: "The vault verifies the proof itself and checks it opens this exact deposit before releasing anything.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section shell">
      <Reveal className="sec-head">
        <span className="label">[02] — Guarantees</span>
        <h2>What the protocol actually enforces.</h2>
      </Reveal>

      <Reveal className="mesh">
        {FEATURES.map((feature, index) => (
          <article key={feature.title} className="feature">
            <span className="feature-num">{String(index + 1).padStart(2, "0")}</span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
