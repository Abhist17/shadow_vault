import { useState } from "react";
import { generateProof } from "../../api/vault";

export default function Proof() {
  const [loading, setLoading] = useState(false);

  async function handleProof() {
    setLoading(true);

    try {
      const result = await generateProof();

      console.log(result);

      localStorage.setItem("proofGenerated", "true");

      window.dispatchEvent(
        new Event("proof")
      );

      alert("Proof Generated Successfully!");
    } catch (err) {
      console.error(err);
      alert("Proof Generation Failed!");
    }

    setLoading(false);
  }

  return (
    <div className="card">
      <h2>Generate Proof</h2>

      <p>
        Generate a Noir proof proving ownership of your vault
        without revealing your secret.
      </p>

      <button
        className="btn-primary"
        onClick={handleProof}
        disabled={loading}
      >
        {loading
          ? "Generating..."
          : "Generate Proof"}
      </button>
    </div>
  );
}