import {
  CheckCircle2,
  Circle,
} from "lucide-react";

const steps = [
  "Deposit Created",
  "Commitment Generated",
  "Proof Generated",
  "Verified On Stellar",
  "Withdraw Completed",
];

export default function StatusTimeline() {
  return (
    <section className="section" style={{ paddingBottom: 120 }}>
      <div className="card" style={{ padding: 40 }}>
        <h2
          style={{
            marginBottom: 35,
          }}
        >
          Workflow
        </h2>

        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "15px 0",
            }}
          >
            {index === 0 ? (
              <CheckCircle2 color="#7dff9b" />
            ) : (
              <Circle color="#555" />
            )}

            {step}
          </div>
        ))}
      </div>
    </section>
  );
}