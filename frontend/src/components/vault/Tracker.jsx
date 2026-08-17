import { motion } from "framer-motion";

import { STEPS } from "../../context/steps";

const LABELS = {
  commit: "Commit",
  deposit: "Deposit",
  prove: "Prove",
  verify: "Verify",
  withdraw: "Withdraw",
};

/**
 * Sticky overview of the pipeline.
 *
 * The dashboard is tall enough that the step you are on can scroll out of view,
 * which made it hard to tell how far through the flow you were. This pins that
 * one fact to the top of the section.
 */
export default function Tracker({ status }) {
  const done = STEPS.filter((step) => status[step] === "done").length;
  const active = STEPS.find((step) => status[step] === "running");

  return (
    <div className="tracker">
      <div className="row-between">
        <span className="eyebrow">Pipeline progress</span>
        <span className="mono faint">
          {done} / {STEPS.length} complete
        </span>
      </div>

      <div className="tracker-bar">
        <motion.span
          className="tracker-fill"
          initial={false}
          animate={{ scaleX: done / STEPS.length }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="tracker-labels">
        {STEPS.map((step) => (
          <span
            key={step}
            className={`tracker-label ${
              status[step] === "done"
                ? "tracker-label-done"
                : step === active
                  ? "tracker-label-active"
                  : ""
            }`}
          >
            {LABELS[step]}
          </span>
        ))}
      </div>
    </div>
  );
}
