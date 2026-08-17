import { AlertCircle, Check, Loader2, Lock } from "lucide-react";

const LABEL = {
  idle: "Ready",
  running: "Working",
  done: "Done",
  error: "Failed",
  locked: "Locked",
};

/**
 * One stage of the vault pipeline.
 *
 * A locked step stays in place and dims rather than disappearing, and says why
 * it is locked — the sequence should be legible by reading, not by clicking a
 * button and getting an error back.
 */
export default function StepCard({
  index,
  title,
  description,
  status,
  error,
  locked,
  lockedReason,
  children,
  action,
}) {
  const state = locked && status === "idle" ? "locked" : status;

  return (
    <li className={`step ${state === "locked" ? "step-locked" : ""}`}>
      <span className="step-i">{String(index).padStart(2, "0")}</span>

      <div className="step-body">
        <div className="row-between">
          <h3>{title}</h3>

          <span className={`state state-${tone(state)}`}>
            {state === "running" && <Loader2 size={12} className="spin" />}
            {state === "done" && <Check size={12} strokeWidth={3} />}
            {state === "error" && <AlertCircle size={12} />}
            {state === "locked" && <Lock size={11} />}
            {LABEL[state]}
          </span>
        </div>

        <p className="step-desc">{description}</p>

        {children}

        {error && (
          <p className="step-err" role="alert">
            <AlertCircle size={14} />
            <span>{error}</span>
          </p>
        )}

        {state === "locked" ? (
          <p className="step-lock">
            <Lock size={11} />
            {lockedReason}
          </p>
        ) : (
          <div className="step-actions">{action}</div>
        )}
      </div>
    </li>
  );
}

function tone(state) {
  if (state === "done") return "done";
  if (state === "error") return "error";
  if (state === "running") return "active";
  return "idle";
}
