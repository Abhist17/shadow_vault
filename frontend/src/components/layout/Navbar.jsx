export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "24px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(5,5,5,.75)",
        backdropFilter: "blur(15px)",
        zIndex: 100,
      }}
    >
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        ShadowVault
      </h2>

      <div
        style={{
          display: "flex",
          gap: 30,
        }}
      >
        <a href="#features">Features</a>
        <a href="#architecture">Architecture</a>
        <a href="#vault">Vault</a>
      </div>
    </nav>
  );
}