export default function Proof() {
  return (
    <div className="card">
      <h2>Generate Proof</h2>

      <p>
        Generate a Noir proof proving ownership of your vault
        without revealing your secret.
      </p>

      <button className="btn-primary">
        Generate Proof
      </button>
    </div>
  );
}