#![no_std]

use soroban_sdk::{
    contract,
    contracterror,
    contractimpl,
    contracttype,
    BytesN,
    Env,
};

#[contracterror]
#[repr(u32)]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum VaultError {
    AlreadyWithdrawn = 1,
}

#[contracttype]
#[derive(Clone)]
pub struct Deposit {
    pub commitment: BytesN<32>,
    pub amount: i128,
    pub withdrawn: bool,
}

#[contracttype]
pub enum DataKey {
    Deposit(u64),
    Nullifier(BytesN<32>),
}

#[contract]
pub struct Vault;

#[contractimpl]
impl Vault {
    pub fn deposit(
        env: Env,
        deposit_id: u64,
        commitment: BytesN<32>,
        amount: i128,
    ) {
        let deposit = Deposit {
            commitment,
            amount,
            withdrawn: false,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Deposit(deposit_id), &deposit);
    }

    pub fn get_deposit(
        env: Env,
        deposit_id: u64,
    ) -> Deposit {
        env.storage()
            .persistent()
            .get(&DataKey::Deposit(deposit_id))
            .unwrap()
    }

    pub fn withdraw(
        env: Env,
        deposit_id: u64,
        nullifier: BytesN<32>,
    ) -> Result<(), VaultError> {

        if env.storage()
            .persistent()
            .has(&DataKey::Nullifier(nullifier.clone()))
        {
            return Err(VaultError::AlreadyWithdrawn);
        }

        let mut deposit: Deposit = env.storage()
            .persistent()
            .get(&DataKey::Deposit(deposit_id))
            .unwrap();

        if deposit.withdrawn {
            return Err(VaultError::AlreadyWithdrawn);
        }

        deposit.withdrawn = true;

        env.storage()
            .persistent()
            .set(&DataKey::Deposit(deposit_id), &deposit);

        env.storage()
            .persistent()
            .set(&DataKey::Nullifier(nullifier), &true);

        Ok(())
    }

    pub fn is_nullifier_used(
        env: Env,
        nullifier: BytesN<32>,
    ) -> bool {
        env.storage()
            .persistent()
            .has(&DataKey::Nullifier(nullifier))
    }
}