// Thin API client. Uses the platform fetch rather than axios: axios was
// imported here but missing from package.json, so a fresh clone failed to build.

const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

/**
 * Every backend failure arrives as `{ success: false, error }` with a real HTTP
 * status. Surfacing `error` verbatim is what lets the UI say "that deposit ID is
 * already taken" instead of a blanket "Backend Error".
 */
async function request(path, { method = "POST", body, signal } = {}) {
  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (cause) {
    if (cause?.name === "AbortError") throw cause;
    throw new Error(`Cannot reach the backend at ${BASE_URL}. Is it running?`, { cause });
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.error || `Request failed (${response.status})`);
  }

  return payload;
}

export const api = {
  health: () => request("/health", { method: "GET" }),

  /** Derive commitment + nullifier from the secret. Never touches the chain. */
  deriveCommitment: ({ secret, depositId, amount }) =>
    request("/deposit", { body: { secret, depositId, amount } }),

  /** Record the commitment in the vault contract. */
  depositOnChain: ({ depositId, commitment, amount }) =>
    request("/deposit-stellar", { body: { depositId, commitment, amount } }),

  /** Generate an UltraHonk proof bound to this secret and deposit. */
  generateProof: ({ secret, depositId }) => request("/proof", { body: { secret, depositId } }),

  /** Ask the verifier contract to check the proof, without withdrawing. */
  verifyProof: ({ depositId }) => request("/verify", { body: { depositId } }),

  /** Withdraw. The vault re-verifies the proof and burns the nullifier. */
  withdraw: ({ depositId }) => request("/withdraw", { body: { depositId } }),

  getDeposit: (depositId) => request(`/deposit/${depositId}`, { method: "GET" }),
};

export { BASE_URL };
