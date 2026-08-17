import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Fades content up as it enters the viewport.
 *
 * The hidden state is applied by JS in a layout effect (before paint, so there
 * is no flash) rather than baked into the stylesheet. That inversion matters:
 * if the observer never runs — script blocked, an old browser, a throttled
 * background tab — the content is simply visible instead of stuck at opacity 0.
 * Animation should never be load-bearing for whether text can be read.
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div", ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.dataset.reveal = "hidden";
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || node.dataset.reveal !== "hidden") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ "--d": `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
