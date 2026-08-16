import { Code2, ShieldCheck } from "lucide-react";

const REPO = "https://github.com/Abhist17/shadow_vault";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div className="stack" style={{ gap: "0.5rem" }}>
          <p className="footer-brand">
            Shadow<span className="gold">Vault</span>
          </p>
          <p className="footer-note">
            Privacy-preserving vault on Stellar. Poseidon2 commitments, Noir circuits, UltraHonk
            proofs, Soroban verification.
          </p>
        </div>

        <div className="row footer-links">
          <a className="pill" href={REPO} target="_blank" rel="noopener noreferrer">
            <Code2 size={14} />
            Source
          </a>

          <span className="pill">
            <ShieldCheck size={14} />
            Testnet demo
          </span>
        </div>
      </div>

      <div className="shell footer-base">
        <span className="faint">Built with Noir · Barretenberg · Soroban · Stellar</span>
      </div>
    </footer>
  );
}
