import { motion } from "framer-motion";

/**
 * Fades content up as it scrolls into view.
 *
 * `once` keeps it from re-firing when the user scrolls back, which otherwise
 * makes a long page feel twitchy. Framer honours prefers-reduced-motion, and
 * the CSS override in index.css collapses the durations regardless.
 */
export default function Reveal({ children, delay = 0, y = 22, className, style, as = "div" }) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
