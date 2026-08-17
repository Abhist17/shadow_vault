import { useEffect, useRef, useState } from "react";

const SETS = {
  hex: "0123456789abcdef",
  digits: "0123456789",
};

/**
 * Settles text in by cycling random hex glyphs, locking one character at a time.
 *
 * Hex specifically, because everything it decorates here is a hash. The state
 * starts as the finished text, so a browser that never runs the effect shows the
 * real value rather than noise.
 */
export default function Scramble({ text, speed = 28, className = "", trigger = "mount", charset = "hex" }) {
  const [shown, setShown] = useState(text);
  const [lastText, setLastText] = useState(text);
  const timer = useRef(null);

  // Resync during render rather than in an effect: a changed `text` makes the
  // displayed value stale immediately, not one paint later.
  if (lastText !== text) {
    setLastText(text);
    setShown(text);
  }

  function run() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    clearInterval(timer.current);
    let frame = 0;

    timer.current = setInterval(() => {
      // Two frames per character keeps the reveal readable rather than frantic.
      const locked = Math.floor(frame / 2);

      if (locked >= text.length) {
        clearInterval(timer.current);
        setShown(text);
        return;
      }

      setShown(
        text.slice(0, locked) +
          text
            .slice(locked)
            .split("")
            .map((char) => {
              // Structural characters stay put; only the value glyphs churn.
              if (/[\s<·×/.-]/.test(char)) return char;
              const pool = SETS[charset] ?? SETS.hex;
              return pool[Math.floor(Math.random() * pool.length)];
            })
            .join(""),
      );

      frame += 1;
    }, speed);
  }

  useEffect(() => {
    if (trigger === "mount") run();
    const running = timer;
    return () => clearInterval(running.current);
    // `run` is stable enough for this: it only closes over props that, when they
    // change, already resync `shown` during render above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  const handlers = trigger === "hover" ? { onMouseEnter: run } : {};

  return (
    <span className={className} {...handlers}>
      {shown}
    </span>
  );
}
