import { motion, useScroll } from "framer-motion";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useScrollSpy } from "../../hooks/useScrollSpy";

const LINKS = [
  { id: "about", label: "Why" },
  { id: "features", label: "Features" },
  { id: "flow", label: "Protocol" },
  { id: "vault", label: "Vault" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Reading progress for the hairline under the bar. useScroll is driven by a
  // motion value, so the bar animates without re-rendering the navbar.
  const { scrollYProgress } = useScroll();

  const ids = useMemo(() => LINKS.map((link) => link.id), []);
  const active = useScrollSpy(ids);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner shell">
        <button className="nav-brand" onClick={() => go("top")}>
          <span className="nav-mark" aria-hidden="true">
            <ShieldCheck size={16} />
          </span>
          Shadow<span className="gold">Vault</span>
        </button>

        <nav className="nav-links" aria-label="Sections">
          {LINKS.map((link) => (
            <button
              key={link.id}
              className={`nav-link ${active === link.id ? "nav-link-active" : ""}`}
              onClick={() => go(link.id)}
              aria-current={active === link.id ? "true" : undefined}
            >
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

      <motion.div className="nav-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      {open && (
        <motion.div
          className="nav-drawer"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {LINKS.map((link) => (
            <button key={link.id} className="nav-drawer-link" onClick={() => go(link.id)}>
              {link.label}
            </button>
          ))}

          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: "0.75rem" }}
            onClick={() => go("vault")}
          >
            <ShieldCheck size={16} />
            Launch vault
          </button>
        </motion.div>
      )}
    </header>
  );
}
