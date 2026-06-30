use dep::poseidon::poseidon2::Poseidon2;

fn main(
    secret: Field,
    deposit_id: Field,
) -> pub Field {
    Poseidon2::hash([secret, deposit_id], 2)
}

#[test]
fn test_main() {
    let secret = 123;
    let deposit_id = 999;

    let _ = main(secret, deposit_id);
}