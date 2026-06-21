use dep::poseidon::poseidon2::Poseidon2;

fn main(secret: Field, commitment: pub Field) {
    let computed_hash = Poseidon2::hash([secret], 1);
    assert(computed_hash == commitment);
}

