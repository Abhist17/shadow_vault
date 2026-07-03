import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  const scrollTo = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(10,10,10,.95)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(212,175,55,.12)",
      }}
    >
      <div
        style={{
          maxWidth: 1450,
          margin: "auto",
          padding: "18px 35px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => scrollTo("home")}
          style={{
            fontSize: 28,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Shadow<span style={{ color: "#D4AF37" }}>Vault</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 45,
          }}
        >
          <NavItem
            title="Home"
            onClick={() => scrollTo("home")}
          />
          <NavItem
  title="About"
  onClick={() => scrollTo("about")}
/>

          <NavItem
            title="Workflow"
            onClick={() => scrollTo("flow")}
          />

          
        </div>

        <button
          className="btn-primary"
          onClick={() => scrollTo("dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <ShieldCheck size={18} />

          Launch Vault
        </button>
      </div>
    </nav>
  );
}

function NavItem({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        color: "#B5B5B5",
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        padding: 0,
      }}
    >
      {title}
    </button>
  );
}