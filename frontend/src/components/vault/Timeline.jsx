export default function Timeline() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "100px auto",
        padding: "0 30px",
      }}
    >
      <h2>Transaction Flow</h2>

      <ol
        style={{
          lineHeight: 2,
          marginTop: 20,
        }}
      >
        <li>Deposit funds</li>
        <li>Create Poseidon commitment</li>
        <li>Generate Noir proof</li>
        <li>Verify on Stellar</li>
        <li>Withdraw privately</li>
      </ol>
    </section>
  );
}