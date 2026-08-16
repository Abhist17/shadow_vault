import { useEffect, useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";

const LINKS = [
  { id: "about", label: "Why" },
  { id: "features", label: "Features" },
  { id: "flow", label: "Protocol" },
  { id: "vault", label: "Vault" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock scroll behind the mobile drawer so the page cannot move underneath it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(id) {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="nav">
      <div className="nav-inner shell">
        <button className="nav-brand" onClick={() => go("top")}>
          Shadow<span className="gold">Vault</span>
        </button>

        <nav className="nav-links" aria-label="Sections">
          {LINKS.map((link) => (
            <button key={link.id} className="nav-link" onClick={() => go(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="btn btn-primary nav-cta" onClick={() => go("vault")}>
            <ShieldCheck size={16} />
            Launch vault
          </button>

          <button
            className="btn btn-icon nav-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-drawer">
          {LINKS.map((link) => (
            <button key={link.id} className="nav-drawer-link" onClick={() => go(link.id)}>
              {link.label}
            </button>
          ))}

          <button className="btn btn-primary btn-block" onClick={() => go("vault")}>
            <ShieldCheck size={16} />
            Launch vault
          </button>
        </div>
      )}
    </header>
  );
}
