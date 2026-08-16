import { useCallback, useMemo, useReducer } from "react";
import { toast } from "sonner";

import { api } from "../lib/api";
import { VaultContext } from "./vault-context";

/**
 * The five vault stages are strictly sequential — you cannot verify a proof you
 * have not generated, or withdraw a deposit that was never recorded. The old UI
 * kept each card's state in localStorage with hand-rolled window events, so
 * every card could be triggered independently and out of order.
 *
 * Holding the pipeline in one reducer means a step is enabled only when its
 * prerequisite has actually completed.
 */

import { STEPS } from "./steps";

const initialState = {
  inputs: { secret: "", depositId: "", amount: "1000" },
  commitment: null,
  nullifier: null,
  proof: null,
  status: Object.fromEntries(STEPS.map((step) => [step, "idle"])),
  error: Object.fromEntries(STEPS.map((step) => [step, null])),
  busy: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setInput":
      return {
        ...state,
        inputs: { ...state.inputs, [action.field]: action.value },
      };

    case "reset":
      return { ...initialState, inputs: state.inputs };

    case "start":
      return {
        ...state,
        busy: action.step,
        status: { ...state.status, [action.step]: "running" },
        error: { ...state.error, [action.step]: null },
      };

    case "succeed":
      return {
        ...state,
        ...action.patch,
        busy: null,
        status: { ...state.status, [action.step]: "done" },
      };

    case "fail":
      return {
        ...state,
        busy: null,
        status: { ...state.status, [action.step]: "error" },
        error: { ...state.error, [action.step]: action.message },
      };

    default:
      return state;
  }
}



export function VaultProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInput = useCallback((field, value) => {
    dispatch({ type: "setInput", field, value });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
    toast("Flow reset", { description: "Start a new deposit with a fresh ID." });
  }, []);

  /** Shared runner: one place for busy state, toasts and error capture. */
  const runStep = useCallback(async (step, { pending, success, action, patch }) => {
    dispatch({ type: "start", step });

    const toastId = toast.loading(pending);

    try {
      const result = await action();

      dispatch({ type: "succeed", step, patch: patch ? patch(result) : {} });
      toast.success(success(result), { id: toastId });

      return result;
    } catch (cause) {
      const message = cause?.message || "Something went wrong";

      dispatch({ type: "fail", step, message });
      toast.error(message, { id: toastId, duration: 8000 });

      return null;
    }
  }, []);

  const actions = useMemo(() => {
    const { inputs } = state;

    return {
      commit: () =>
        runStep("commit", {
          pending: "Deriving Poseidon2 commitment…",
          success: () => "Commitment derived",
          action: () => api.deriveCommitment(inputs),
          patch: (r) => ({ commitment: r.commitment, nullifier: r.nullifier }),
        }),

      deposit: () =>
        runStep("deposit", {
          pending: "Recording commitment on Stellar…",
          success: () => "Deposit recorded on-chain",
          action: () =>
            api.depositOnChain({
              depositId: inputs.depositId,
              commitment: state.commitment,
              amount: inputs.amount,
            }),
        }),

      prove: () =>
        runStep("prove", {
          pending: "Generating UltraHonk proof…",
          success: (r) => `Proof generated in ${r.elapsedMs} ms`,
          action: () => api.generateProof({ secret: inputs.secret, depositId: inputs.depositId }),
          patch: (r) => ({ proof: { bytes: r.proofBytes, elapsedMs: r.elapsedMs } }),
        }),

      verify: () =>
        runStep("verify", {
          pending: "Verifying proof on Soroban…",
          success: (r) => `Proof verified on-chain in ${r.elapsedMs} ms`,
          action: () => api.verifyProof({ depositId: inputs.depositId }),
        }),

      withdraw: () =>
        runStep("withdraw", {
          pending: "Submitting withdrawal…",
          success: () => "Withdrawal complete",
          action: () => api.withdraw({ depositId: inputs.depositId }),
        }),
    };
  }, [state, runStep]);

  /**
   * A step unlocks only once the step it depends on has completed. `commit` also
   * needs both user inputs present, which is what stops the request that used to
   * fail server-side with a generic error.
   */
  const canRun = useMemo(() => {
    const { inputs, status } = state;
    const hasInputs = inputs.secret.trim() !== "" && inputs.depositId.trim() !== "";

    return {
      commit: hasInputs,
      deposit: status.commit === "done",
      prove: status.deposit === "done",
      verify: status.prove === "done",
      withdraw: status.verify === "done",
    };
  }, [state]);

  const value = useMemo(
    () => ({ ...state, setInput, reset, actions, canRun }),
    [state, setInput, reset, actions, canRun]
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}
