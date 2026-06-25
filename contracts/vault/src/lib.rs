#![no_std]

use soroban_sdk::{
    contract,
    contractimpl,
    contracttype,
    Env,
};

#[contracttype]
pub enum DataKey {
    Deposit(u64),
}

#[contract]
pub struct Vault;

#[contractimpl]
impl Vault {

    pub fn deposit(
        env: Env,
        deposit_id: u64,
        commitment: soroban_sdk::Bytes
    ) {
        env.storage()
            .persistent()
            .set(&DataKey::Deposit(deposit_id), &commitment);
    }

    pub fn get_commitment(
        env: Env,
        deposit_id: u64,
    ) -> u128 {
        env.storage()
            .persistent()
            .get(&DataKey::Deposit(deposit_id))
            .unwrap()
    }
}
