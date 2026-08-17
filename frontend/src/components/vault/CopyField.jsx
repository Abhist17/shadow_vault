import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Read-only hash display with a copy button and a transient confirmation. */
export default function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard is unavailable over plain http on some browsers; the value is
      // selectable on screen either way, so this is not worth interrupting for.
    }
  }

  return (
    <div className="hash">
      <div className="hash-top">
        <span className="label">{label}</span>

        <button type="button" className="btn btn-icon" onClick={copy} aria-label={`Copy ${label}`}>
          {copied ? <Check size={13} color="var(--ok)" /> : <Copy size={13} />}
        </button>
      </div>

      <p className="hash-val">{value}</p>
    </div>
  );
}
