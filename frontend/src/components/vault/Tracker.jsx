import { STEPS } from "../../context/steps";

const NAMES = {
  commit: "Commit",
  deposit: "Deposit",
  prove: "Prove",
  verify: "Verify",
  withdraw: "Withdraw",
};

/**
 * Sticky overview of the pipeline.
 *
 * The section is tall enough that the step you are on scrolls out of view, so
 * this pins the one fact you keep wanting: how far through the flow you are.
 */
export default function Tracker({ status }) {
  const done = STEPS.filter((step) => status[step] === "done").length;

  return (
    <div className="tracker">
      <div className="row-between">
        <span className="label">Progress</span>
        <span className="label">
          {String(done).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="tracker-segs">
        {STEPS.map((step) => (
          <span key={step} className={`tracker-seg tracker-seg-${status[step] === "running" ? "active" : status[step]}`} />
        ))}
      </div>

      <div className="tracker-names">
        {STEPS.map((step) => (
          <span
            key={step}
            className={`tracker-name ${
              status[step] === "done"
                ? "tracker-name-done"
                : status[step] === "running"
                  ? "tracker-name-active"
                  : ""
            }`}
          >
            {NAMES[step]}
          </span>
        ))}
      </div>
    </div>
  );
}
