import { useCallback } from "react";

/**
 * Writes the cursor position into `--mx` / `--my` on the hovered element so CSS
 * can paint a radial highlight that follows the pointer.
 *
 * Doing this with CSS custom properties rather than React state keeps the work
 * off the render path entirely — mousemove fires far too often to re-render on.
 * Touch and keyboard users never fire the handler, and the highlight layer just
 * stays at its default opacity of 0, so nothing depends on it.
 */
export function useSpotlight() {
  return useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);
}
