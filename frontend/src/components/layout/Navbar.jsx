import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useScrollSpy } from "../../hooks/useScrollSpy";
import mark from "../../assets/sv1.jpeg";

const LINKS = [
  { id: "why", label: "Why" },
  { id: "features", label: "Design" },
  { id: "flow", label: "Protocol" },
  { id: "vault", label: "Vault" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const bar = useRef(null);

  const ids = useMemo(() => LINKS.map((link) => link.id), []);
  const active = useScrollSpy(ids);

  // One scroll listener drives both the stuck state and the progress rule. The
  // rule is written straight to the transform so progress never re-renders.
  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;

      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      setStuck(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header className={`nav ${stuck ? "nav-stuck" : ""}`}>
      <div className="nav-inner shell">
        <button className="nav-brand" onClick={() => go("top")}>
          <img src={mark} alt="" aria-hidden="true" />
          ShadowVault
        </button>

        <nav className="nav-links" aria-label="Sections">
          {LINKS.map((link) => (
            <button
              key={link.id}
              className={`nav-link ${active === link.id ? "nav-link-on" : ""}`}
              onClick={() => go(link.id)}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="nav-right">
          <button className="btn btn-primary nav-cta" onClick={() => go("vault")}>
            Open vault
          </button>

          <button
            className="btn btn-icon nav-burger"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <span ref={bar} className="nav-bar" aria-hidden="true" />

      {open && (
        <div className="nav-sheet">
          {LINKS.map((link) => (
            <button key={link.id} onClick={() => go(link.id)}>
              {link.label}
            </button>
          ))}

          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: "1.25rem" }}
            onClick={() => go("vault")}
          >
            Open vault
          </button>
        </div>
      )}
    </header>
  );
}
