import { useState } from "react";
import { withdraw } from "../../api/vault";

export default function Withdraw() {

  const [loading, setLoading] = useState(false);

  async function handleWithdraw() {

    const depositId = Number(
      localStorage.getItem("depositId")
    );

    try {

      setLoading(true);

      const result = await withdraw({
        depositId,
        nullifier:
          "0000000000000000000000000000000000000000000000000000000000000002",
      });

      console.log(result);

      alert("Withdrawal Successful!");

    } catch (err) {

      console.error(err);

      alert("Withdrawal Failed!");

    }

    setLoading(false);

  }

  return (
    <div className="card">

      <h2>Withdraw</h2>

      <p>
        Withdraw funds after successful proof verification.
      </p>

      <button
        className="btn-primary"
        onClick={handleWithdraw}
        disabled={loading}
      >
        {loading
          ? "Withdrawing..."
          : "Withdraw Funds"}
      </button>

    </div>
  );
}