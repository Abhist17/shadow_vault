use dep::poseidon::poseidon2::Poseidon2;

// ShadowVault ownership circuit.
//
// Proves knowledge of a `secret` that opens the vault commitment recorded
// on-chain for `deposit_id`, and derives the withdrawal nullifier from that
// same secret. `secret` and `deposit_id` stay private; the verifier only ever
// learns the commitment and the nullifier.
//
// Public inputs are emitted in declaration order, so the serialized
// `public_inputs` file is exactly:
//
//     [0..32)  commitment  (big-endian field element)
//     [32..64) nullifier   (big-endian field element)
//
// The vault contract relies on that layout to bind a proof to a deposit.
fn main(
    secret: Field,
    deposit_id: Field,
    commitment: pub Field,
    nullifier: pub Field,
) {
    // The commitment binds the secret to one specific deposit slot, so a proof
    // for deposit A can never be replayed against deposit B.
    let computed_commitment = Poseidon2::hash([secret, deposit_id], 2);
    assert(computed_commitment == commitment);

    // The nullifier is derived from the secret alone. Arity 1 vs arity 2 gives
    // it domain separation from the commitment, so publishing the nullifier at
    // withdrawal time leaks nothing about the commitment's preimage.
    let computed_nullifier = Poseidon2::hash([secret], 1);
    assert(computed_nullifier == nullifier);
}

#[test]
fn commitment_and_nullifier_match_known_vector() {
    // Cross-checked against @aztec/bb.js poseidon2Hash in the backend, which is
    // what generates these values at runtime.
    let secret = 123;
    let deposit_id = 999;

    main(
        secret,
        deposit_id,
        6027956103379247175334154795400619218281914933719309476332502844970033476296,
        19731118065711264997944706594056596257023240707061919347492376397191952734924,
    );
}
