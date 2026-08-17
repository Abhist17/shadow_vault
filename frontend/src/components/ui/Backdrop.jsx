import { useEffect } from "react";

/**
 * Blueprint grid plus a soft light that follows the cursor.
 *
 * The light is written to CSS custom properties on the root and throttled to
 * one write per animation frame — pointermove fires far too often to re-render
 * on, and this way React is not involved at all. Coarse pointers never wire the
 * listener up, so the grid simply sits there on touch.
 */
export default function Backdrop() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    function write() {
      frame = 0;
      document.documentElement.style.setProperty("--cx", `${x}px`);
      document.documentElement.style.setProperty("--cy", `${y}px`);
    }

    function onMove(event) {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(write);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="backdrop-grid" aria-hidden="true" />
      <div className="backdrop-light" aria-hidden="true" />
    </>
  );
}
