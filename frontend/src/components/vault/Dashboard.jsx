import { useVault } from "../../context/useVault";
import Reveal from "../ui/Reveal";
import CopyField from "./CopyField";
import StepCard from "./StepCard";
import Tracker from "./Tracker";

export default function Dashboard() {
  const { inputs, setInput, commitment, nullifier, proof, status, error, busy, actions, canRun, reset } =
    useVault();

  const disabled = busy !== null;

  return (
    <section id="vault" className="section shell">
      <Reveal className="sec-head">
        <span className="label">[04] — Vault</span>
        <h2>Run the flow.</h2>
        <p className="lede">
          Each stage feeds the next. The commitment binds your secret to a deposit, the proof opens
          that commitment without revealing it, and the vault releases nothing until the verifier
          contract accepts the proof on-chain.
        </p>
      </Reveal>

      {/* Tracker and steps share one wrapper so the sticky element has a range
          to travel — sticky does nothing inside a box its own height. */}
      <div className="pipeline">
        <Tracker status={status} />

        <ol className="steps">
          <StepCard
            index={1}
            title="Derive commitment"
            description="Your secret is hashed with Poseidon2 into a commitment and a nullifier. The secret itself never reaches the blockchain."
            status={status.commit}
            error={error.commit}
            action={
              <button
                className="btn btn-primary"
                onClick={actions.commit}
                disabled={disabled || !canRun.commit}
              >
                {status.commit === "done" ? "Re-derive commitment" : "Derive commitment"}
              </button>
            }
          >
            <div className="step-fields">
              <div className="field">
                <label htmlFor="secret">Secret</label>
                <input
                  id="secret"
                  className="input"
                  type="password"
                  placeholder="passphrase or number"
                  value={inputs.secret}
                  onChange={(event) => setInput("secret", event.target.value)}
                  disabled={disabled}
                  autoComplete="off"
                />
                <span className="hint">Client-side and in memory only. Do not lose it.</span>
              </div>

              <div className="field">
                <label htmlFor="depositId">Deposit ID</label>
                <input
                  id="depositId"
                  className="input"
                  inputMode="numeric"
                  placeholder="1042"
                  value={inputs.depositId}
                  onChange={(event) => setInput("depositId", event.target.value)}
                  disabled={disabled}
                />
                <span className="hint">Write-once. One deposit per ID.</span>
              </div>

              <div className="field">
                <label htmlFor="amount">Amount</label>
                <input
                  id="amount"
                  className="input"
                  inputMode="numeric"
                  value={inputs.amount}
                  onChange={(event) => setInput("amount", event.target.value)}
                  disabled={disabled}
                />
                <span className="hint">Recorded with the commitment.</span>
              </div>
            </div>

            {commitment && (
              <div className="stack" style={{ gap: "0.75rem" }}>
                <CopyField label="commitment — poseidon2(secret, depositId)" value={commitment} />
                <CopyField label="nullifier — poseidon2(secret)" value={nullifier} />
              </div>
            )}
          </StepCard>

          <StepCard
            index={2}
            title="Record on Stellar"
            description="The commitment is written into the vault contract. An observer learns that a deposit exists and nothing else."
            status={status.deposit}
            error={error.deposit}
            locked={!canRun.deposit}
            lockedReason="Derive a commitment first"
            action={
              <button
                className="btn btn-primary"
                onClick={actions.deposit}
                disabled={disabled || !canRun.deposit || status.deposit === "done"}
              >
                {status.deposit === "done" ? "Recorded on-chain" : "Deposit to Stellar"}
              </button>
            }
          />

          <StepCard
            index={3}
            title="Generate proof"
            description="Noir builds a witness from your secret and Barretenberg produces an UltraHonk proof that you can open the commitment."
            status={status.prove}
            error={error.prove}
            locked={!canRun.prove}
            lockedReason="Record the deposit on-chain first"
            action={
              <button
                className="btn btn-primary"
                onClick={actions.prove}
                disabled={disabled || !canRun.prove}
              >
                {status.prove === "done" ? "Regenerate proof" : "Generate proof"}
              </button>
            }
          >
            {proof && (
              <dl className="hash" style={{ padding: "0.35rem 0.85rem" }}>
                <div className="kv">
                  <dt>proof_size</dt>
                  <dd>{proof.bytes.toLocaleString()} bytes</dd>
                </div>
                <div className="kv">
                  <dt>elapsed</dt>
                  <dd>{proof.elapsedMs} ms</dd>
                </div>
                <div className="kv">
                  <dt>scheme</dt>
                  <dd>ultrahonk · keccak</dd>
                </div>
              </dl>
            )}
          </StepCard>

          <StepCard
            index={4}
            title="Verify on-chain"
            description="The Soroban verifier checks the proof against the verification key baked in at deployment. A real pairing check, not a mock."
            status={status.verify}
            error={error.verify}
            locked={!canRun.verify}
            lockedReason="Generate a proof first"
            action={
              <button
                className="btn btn-primary"
                onClick={actions.verify}
                disabled={disabled || !canRun.verify}
              >
                {status.verify === "done" ? "Verify again" : "Verify on Soroban"}
              </button>
            }
          />

          <StepCard
            index={5}
            title="Withdraw"
            description="The vault re-verifies the proof itself, confirms the commitment matches this deposit, then burns the nullifier so it can never be spent twice."
            status={status.withdraw}
            error={error.withdraw}
            locked={!canRun.withdraw}
            lockedReason="Verify the proof first"
            action={
              <button
                className="btn btn-primary"
                onClick={actions.withdraw}
                disabled={disabled || !canRun.withdraw || status.withdraw === "done"}
              >
                {status.withdraw === "done" ? "Withdrawn" : "Withdraw funds"}
              </button>
            }
          />
        </ol>

        <div className="row" style={{ marginTop: "2rem" }}>
          <button className="btn btn-ghost" onClick={reset} disabled={disabled}>
            Reset flow
          </button>
        </div>
      </div>
    </section>
  );
}
