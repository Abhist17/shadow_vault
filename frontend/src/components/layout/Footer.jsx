import { Code2, Heart, ShieldCheck } from "lucide-react";

const REPO = "https://github.com/Abhist17/shadow_vault";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div className="stack" style={{ gap: "0.5rem" }}>
          <p className="footer-brand">
            <span className="nav-mark" aria-hidden="true">
              <ShieldCheck size={16} />
            </span>
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
            <span className="dot-live" aria-hidden="true" />
            Testnet demo
          </span>
        </div>
      </div>

      <div className="shell footer-base">
        <span className="faint">Built with Noir · Barretenberg · Soroban · Stellar</span>
        <span className="faint" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
          Made with <Heart size={12} className="gold" /> for private ownership
        </span>
      </div>
    </footer>
  );
}
