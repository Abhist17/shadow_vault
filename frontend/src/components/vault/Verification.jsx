import { useState } from "react";
import { verifyProof } from "../../api/vault";

export default function Verification() {
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    setLoading(true);

    try {
      const result = await verifyProof();

      console.log(result);

      localStorage.setItem("verified", "true");

      window.dispatchEvent(
        new Event("verified")
      );

      alert("Proof Verified Successfully!");
    } catch (err) {
      console.error(err);
      alert("Verification Failed!");
    }

    setLoading(false);
  }

  return (
    <div className="card">
      <h2>Verify Proof</h2>

      <p>
        Verify the Ultrahonk proof on the Stellar blockchain.
      </p>

      <button
        className="btn-primary"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading
          ? "Verifying..."
          : "Verify on Stellar"}
      </button>
    </div>
  );
}