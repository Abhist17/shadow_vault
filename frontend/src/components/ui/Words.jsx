/**
 * Splits a headline into per-word clipping boxes so each word can slide up from
 * beneath the line. Pure CSS once rendered — the stagger is an animation-delay
 * derived from `--i`, so it plays on load without a scroll listener or a timer.
 */
export default function Words({ text, dim = false, offset = 0 }) {
  return text.split(" ").map((word, index) => (
    <span
      // Word order is the identity here; the headline never reorders.
      key={`${word}-${index}`}
      className={`word ${dim ? "word-dim" : ""}`.trim()}
      style={{ "--i": index + offset }}
    >
      <span>{word}</span>
    </span>
  ));
}
