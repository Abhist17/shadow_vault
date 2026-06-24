use dep::poseidon::poseidon2::Poseidon2;

fn main(
    secret: Field,
    deposit_id: Field,
    commitment: pub Field,
) {
    let computed = Poseidon2::hash([secret, deposit_id], 2);

    assert(computed == commitment);
}

#[test]
fn test_main() {
    let secret = 123;
    let deposit_id = 999;

    let commitment = Poseidon2::hash([secret, deposit_id], 2);

    main(secret, deposit_id, commitment);
}
