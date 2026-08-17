import {
  ArrowDownToLine,
  BadgeCheck,
  Cpu,
  Fingerprint,
  RotateCcw,
  Wallet,
} from "lucide-react";

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
      <Reveal className="section-head center">
        <p className="eyebrow">Vault control panel</p>
        <h2>
          Run the <span className="shine">private ownership</span> flow
        </h2>
        <p className="lede">
          Each stage feeds the next: the commitment binds your secret to a deposit, the proof opens
          that commitment without revealing it, and the vault only releases funds once the verifier
          contract accepts the proof on-chain.
        </p>
      </Reveal>

      {/* The tracker sticks within this wrapper, so it has to span the whole
          pipeline — sticky has no range inside a box its own height. */}
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
                className="btn btn-primary btn-block"
                onClick={actions.commit}
                disabled={disabled || !canRun.commit}
              >
                <Fingerprint size={16} />
                {status.commit === "done" ? "Re-derive commitment" : "Derive commitment"}
              </button>
            }
          >
            <div className="grid" style={{ marginBlock: "1.1rem" }}>
              <div className="field">
                <label htmlFor="secret">Secret</label>
                <input
                  id="secret"
                  className="input"
                  type="password"
                  placeholder="Any passphrase or number"
                  value={inputs.secret}
                  onChange={(event) => setInput("secret", event.target.value)}
                  disabled={disabled}
                  autoComplete="off"
                />
                <span className="field-hint">Kept client-side and in memory only. Do not lose it.</span>
              </div>

              <div className="field">
                <label htmlFor="depositId">Deposit ID</label>
                <input
                  id="depositId"
                  className="input"
                  inputMode="numeric"
                  placeholder="e.g. 1042"
                  value={inputs.depositId}
                  onChange={(event) => setInput("depositId", event.target.value)}
                  disabled={disabled}
                />
                <span className="field-hint">Write-once. Each ID can be deposited to a single time.</span>
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
                <span className="field-hint">Recorded alongside the commitment.</span>
              </div>
            </div>

            {commitment && (
              <div className="stack" style={{ marginBottom: "1.1rem" }}>
                <CopyField label="Commitment — Poseidon2(secret, depositId)" value={commitment} />
                <CopyField label="Nullifier — Poseidon2(secret)" value={nullifier} />
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
            lockedReason="Derive a commitment first."
            action={
              <button
                className="btn btn-primary btn-block"
                onClick={actions.deposit}
                disabled={disabled || !canRun.deposit || status.deposit === "done"}
              >
                <Wallet size={16} />
                {status.deposit === "done" ? "Recorded on-chain" : "Deposit to Stellar"}
              </button>
            }
          />

          <StepCard
            index={3}
            title="Generate ZK proof"
            description="Noir builds a witness from your secret and Barretenberg produces an UltraHonk proof that you can open the commitment."
            status={status.prove}
            error={error.prove}
            locked={!canRun.prove}
            lockedReason="Record the deposit on-chain first."
            action={
              <button
                className="btn btn-primary btn-block"
                onClick={actions.prove}
                disabled={disabled || !canRun.prove}
              >
                <Cpu size={16} />
                {status.prove === "done" ? "Regenerate proof" : "Generate proof"}
              </button>
            }
          >
            {proof && (
              <dl className="readout" style={{ marginBottom: "1.1rem" }}>
                <div className="kv">
                  <dt>Proof size</dt>
                  <dd className="mono">{proof.bytes.toLocaleString()} bytes</dd>
                </div>
                <div className="kv">
                  <dt>Proving time</dt>
                  <dd className="mono">{proof.elapsedMs} ms</dd>
                </div>
                <div className="kv">
                  <dt>Scheme</dt>
                  <dd>UltraHonk · keccak oracle</dd>
                </div>
              </dl>
            )}
          </StepCard>

          <StepCard
            index={4}
            title="Verify on-chain"
            description="The Soroban verifier checks the proof against the verification key baked in at deployment. This is a real pairing check, not a mock."
            status={status.verify}
            error={error.verify}
            locked={!canRun.verify}
            lockedReason="Generate a proof first."
            action={
              <button
                className="btn btn-primary btn-block"
                onClick={actions.verify}
                disabled={disabled || !canRun.verify}
              >
                <BadgeCheck size={16} />
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
            lockedReason="Verify the proof first."
            action={
              <button
                className="btn btn-primary btn-block"
                onClick={actions.withdraw}
                disabled={disabled || !canRun.withdraw || status.withdraw === "done"}
              >
                <ArrowDownToLine size={16} />
                {status.withdraw === "done" ? "Withdrawn" : "Withdraw funds"}
              </button>
            }
          />
        </ol>
      </div>

      <div className="row" style={{ justifyContent: "center", marginTop: "2.5rem" }}>
        <button className="btn btn-ghost" onClick={reset} disabled={disabled}>
          <RotateCcw size={15} />
          Reset flow
        </button>
      </div>
    </section>
  );
}
