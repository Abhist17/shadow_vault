fn main(
    secret: Field,
    amount: Field,
    commitment: pub Field,
) {
    assert(secret + amount == commitment);
}

#[test]
fn test_main() {
    main(100, 50, 150);
}
