#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, Address, Bytes, BytesN, Env,
    IntoVal, Symbol,
};

/// Serialized length of the circuit's public inputs: two BN254 field elements.
const PUBLIC_INPUTS_LEN: u32 = 64;

/// How long a touched storage entry is kept alive, in ledgers (~30 days at 5s).
const TTL_BUMP: u32 = 518_400;
/// Refresh an entry once its remaining life drops below this (~7 days).
const TTL_THRESHOLD: u32 = 120_960;

#[contracterror]
#[repr(u32)]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum VaultError {
    /// This deposit has already been withdrawn.
    AlreadyWithdrawn = 1,
    /// No deposit is recorded under this id.
    DepositNotFound = 2,
    /// A deposit already occupies this id; ids are write-once.
    DepositIdTaken = 3,
    /// This nullifier has been spent by an earlier withdrawal.
    NullifierAlreadyUsed = 4,
    /// The proof's commitment does not open this deposit.
    CommitmentMismatch = 5,
    /// public_inputs is not exactly two field elements.
    MalformedPublicInputs = 6,
    /// The nullifier argument disagrees with the one inside the proof.
    NullifierMismatch = 7,
    /// The verifier contract rejected the proof.
    ProofRejected = 8,
    /// Deposit amount must be strictly positive.
    InvalidAmount = 9,
    /// The constructor already ran; the verifier address is immutable.
    AlreadyInitialized = 10,
    /// No verifier address is configured.
    VerifierNotSet = 11,
}

#[contracttype]
#[derive(Clone)]
pub struct Deposit {
    pub depositor: Address,
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
    fn key_verifier() -> Symbol {
        symbol_short!("verifier")
    }

    /// Bind this vault to an UltraHonk verifier contract. The verifier holds the
    /// verification key for the ShadowVault ownership circuit and is immutable
    /// once set, so the circuit a vault trusts can never be swapped out.
    pub fn __constructor(env: Env, verifier: Address) -> Result<(), VaultError> {
        if env.storage().instance().has(&Self::key_verifier()) {
            return Err(VaultError::AlreadyInitialized);
        }

        env.storage()
            .instance()
            .set(&Self::key_verifier(), &verifier);

        Ok(())
    }

    /// Address of the verifier contract this vault defers proof checking to.
    pub fn verifier(env: Env) -> Result<Address, VaultError> {
        env.storage()
            .instance()
            .get(&Self::key_verifier())
            .ok_or(VaultError::VerifierNotSet)
    }

    /// Record a deposit as an opaque commitment.
    ///
    /// The commitment must be `Poseidon2([secret, deposit_id])`; the vault never
    /// sees `secret`. Ids are write-once, otherwise anyone could overwrite a
    /// live deposit and reset its `withdrawn` flag.
    pub fn deposit(
        env: Env,
        depositor: Address,
        deposit_id: u64,
        commitment: BytesN<32>,
        amount: i128,
    ) -> Result<(), VaultError> {
        depositor.require_auth();

        if amount <= 0 {
            return Err(VaultError::InvalidAmount);
        }

        let key = DataKey::Deposit(deposit_id);

        if env.storage().persistent().has(&key) {
            return Err(VaultError::DepositIdTaken);
        }

        let deposit = Deposit {
            depositor,
            commitment,
            amount,
            withdrawn: false,
        };

        env.storage().persistent().set(&key, &deposit);
        env.storage()
            .persistent()
            .extend_ttl(&key, TTL_THRESHOLD, TTL_BUMP);

        Ok(())
    }

    pub fn get_deposit(env: Env, deposit_id: u64) -> Result<Deposit, VaultError> {
        env.storage()
            .persistent()
            .get(&DataKey::Deposit(deposit_id))
            .ok_or(VaultError::DepositNotFound)
    }

    /// Withdraw a deposit by proving ownership in zero knowledge.
    ///
    /// Every link in the chain is checked here, because a valid proof on its own
    /// proves nothing about *which* deposit it opens:
    ///
    ///   1. `public_inputs` decodes to exactly (commitment, nullifier).
    ///   2. That commitment equals the one stored under `deposit_id` — this is
    ///      what stops a proof for one deposit being replayed against another.
    ///   3. The caller-supplied `nullifier` equals the one inside the proof.
    ///   4. The nullifier has never been spent.
    ///   5. The verifier contract accepts the proof against its stored VK.
    ///
    /// Drop any one of these and the ZK layer becomes decorative.
    pub fn withdraw(
        env: Env,
        deposit_id: u64,
        nullifier: BytesN<32>,
        public_inputs: Bytes,
        proof: Bytes,
    ) -> Result<(), VaultError> {
        if public_inputs.len() != PUBLIC_INPUTS_LEN {
            return Err(VaultError::MalformedPublicInputs);
        }

        // Decode the two field elements the circuit exposes.
        let mut raw = [0u8; PUBLIC_INPUTS_LEN as usize];
        public_inputs.copy_into_slice(&mut raw);

        let mut proof_commitment = [0u8; 32];
        proof_commitment.copy_from_slice(&raw[..32]);
        let proof_commitment = BytesN::from_array(&env, &proof_commitment);

        let mut proof_nullifier = [0u8; 32];
        proof_nullifier.copy_from_slice(&raw[32..]);
        let proof_nullifier = BytesN::from_array(&env, &proof_nullifier);

        if proof_nullifier != nullifier {
            return Err(VaultError::NullifierMismatch);
        }

        let deposit_key = DataKey::Deposit(deposit_id);

        let mut deposit: Deposit = env
            .storage()
            .persistent()
            .get(&deposit_key)
            .ok_or(VaultError::DepositNotFound)?;

        if deposit.withdrawn {
            return Err(VaultError::AlreadyWithdrawn);
        }

        // Bind the proof to this specific deposit.
        if deposit.commitment != proof_commitment {
            return Err(VaultError::CommitmentMismatch);
        }

        let nullifier_key = DataKey::Nullifier(nullifier.clone());

        if env.storage().persistent().has(&nullifier_key) {
            return Err(VaultError::NullifierAlreadyUsed);
        }

        // Only now is it worth paying for the pairing check.
        let verifier: Address = env
            .storage()
            .instance()
            .get(&Self::key_verifier())
            .ok_or(VaultError::VerifierNotSet)?;

        let accepted = env
            .try_invoke_contract::<(), soroban_sdk::Error>(
                &verifier,
                &Symbol::new(&env, "prove_identity"),
                (public_inputs, proof).into_val(&env),
            )
            .is_ok();

        if !accepted {
            return Err(VaultError::ProofRejected);
        }

        deposit.withdrawn = true;
        env.storage().persistent().set(&deposit_key, &deposit);
        env.storage()
            .persistent()
            .extend_ttl(&deposit_key, TTL_THRESHOLD, TTL_BUMP);

        env.storage().persistent().set(&nullifier_key, &true);
        env.storage()
            .persistent()
            .extend_ttl(&nullifier_key, TTL_THRESHOLD, TTL_BUMP);

        Ok(())
    }

    pub fn is_nullifier_used(env: Env, nullifier: BytesN<32>) -> bool {
        env.storage()
            .persistent()
            .has(&DataKey::Nullifier(nullifier))
    }
}
