import { useContext } from "react";

import { VaultContext } from "./vault-context";

/** Access the vault pipeline state and actions. */
export function useVault() {
  const context = useContext(VaultContext);

  if (!context) {
    throw new Error("useVault must be used inside a VaultProvider");
  }

  return context;
}
