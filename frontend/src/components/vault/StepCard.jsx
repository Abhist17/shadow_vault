import { AlertCircle, Check, Loader2, Lock } from "lucide-react";

const STATUS_LABEL = {
  idle: "Waiting",
  running: "Working",
  done: "Complete",
  error: "Failed",
};

/**
 * One stage of the vault pipeline.
 *
 * A locked card stays visible but explains *why* it is locked, so the sequence
 * is legible at a glance rather than something the user discovers by clicking a
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
    <li className={`step ${state === "done" ? "step-done" : ""}`}>
      <div className="step-rail" aria-hidden="true">
        <span className={`step-dot step-dot-${state}`}>
          {state === "done" ? (
            <Check size={14} strokeWidth={3} />
          ) : state === "running" ? (
            <Loader2 size={14} className="spin" />
          ) : state === "error" ? (
            <AlertCircle size={14} />
          ) : state === "locked" ? (
            <Lock size={12} />
          ) : (
            index
          )}
        </span>
      </div>

      <div className="card step-body">
        <div className="row-between">
          <div>
            <p className="eyebrow">Step {String(index).padStart(2, "0")}</p>
            <h3>{title}</h3>
          </div>

          <span className={`status status-${statusClass(state)}`}>
            {state === "running" && <Loader2 size={13} className="spin" />}
            {STATUS_LABEL[status] ?? "Locked"}
          </span>
        </div>

        <p className="step-desc">{description}</p>

        {children}

        {error && (
          <p className="step-error" role="alert">
            <AlertCircle size={15} />
            <span>{error}</span>
          </p>
        )}

        {locked && status === "idle" ? (
          <p className="step-locked">
            <Lock size={13} />
            {lockedReason}
          </p>
        ) : (
          action
        )}
      </div>
    </li>
  );
}

function statusClass(state) {
  if (state === "done") return "done";
  if (state === "error") return "error";
  if (state === "running") return "active";
  return "idle";
}
