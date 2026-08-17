const REPO = "https://github.com/Abhist17/shadow_vault";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-top">
        <p className="footer-mark">ShadowVault</p>

        <div className="stack" style={{ gap: "0.75rem", alignItems: "flex-start" }}>
          <span className="label">Built with</span>
          <p className="mono faint" style={{ lineHeight: 2 }}>
            Noir · Barretenberg · Soroban · Stellar
          </p>
        </div>
      </div>

      <div className="shell footer-base">
        <span>Testnet demo — not audited</span>

        <span className="footer-links">
          <a href={REPO} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="#top">Top</a>
        </span>
      </div>
    </footer>
  );
}
