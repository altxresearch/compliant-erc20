# 🇯🇵 Japan Smart Chain Hardhat Starter Project

> A minimal Hardhat project with ERC20 and ERC721 contracts  
> for [Japan Smart Chain](https://japansmartchain.com)

---

## 💻 Workshop Outline

If you're here to code along with our live workshop, or following along at home, welcome! Here's what we're going to do:

### 1. Clone the repo, deploy the basic smart contract version, and perform a test transfer.
```bash
npm i
npm run compile
npm run deploy:all:kaigan
 # add the deployed contract address to .env

npm run getBalance:kaigan
npm run transfer:kaigan
```

> ⚠️ You will not be able to use `npm run mint:kaigan` yet, as the public mint function on the ERC20 contract will be implemented during the workshop.

### 2. Implement Mizuhiki and access manager into the `CompliantERC20.sol` smart contract
To see the code to be implemented during the workshop check the `eth-tokyo-25-workshop` branch

### 3. Deploy the updated smart contract from a verified address, test mint and transfer
```bash
npm i
npm run compile
npm run deploy:all:kaigan
 # add the deployed contract address to .env

npm run getBalance:kaigan
npm run mint:kaigan
npm run transfer:kaigan
```
During the mint and transfer steps, the first transaction will be successful and the second will fail due to missing Mizuhiki Verified SBT.

---

## 📦 What's Included

- `AccessManager.sol`: Role-based access manager contract
- `CompliantERC20.sol`: ERC20 token with mint, Mizuhiki Verified SBT check and role-based access
  All contracts use [OpenZeppelin 5.x](https://docs.openzeppelin.com/contracts/5.x/) and are designed to be simple starting points for working with **Japan Smart Chain**.

---

## 🚀 Quick Start

### Prerequisites

- Node.js v22 (`.nvmrc` provided)
- [Hardhat](https://hardhat.org/)
- Private key with testnet funds

### Setup

```bash
npm install
cp .env.example .env
# then edit .env with your keys
```

### Compile

```bash
npm run compile
```

### Deploy

```bash
# Local Hardhat network
npm run deploy:all:hardhat

# Kaigan testnet (Japan Smart Chain)
npm run deploy:all:kaigan

```

### Test tranfer, mint

Once the contracts have been deployed, the `ERC20_CONTRACT_ADDRESS` should be updated in the `.env` with your own ERC20 contract address on Kaigan.

The following scripts are available to use for minting, checking ERC20 token balance of an address, or minting.

```
npm run mint:kaigan
npm run getBalance:kaigan
npm run transfer:kaigan
```

---

## 📂 Contracts

- `AccessManager.sol`: Access control solution for smart contracts
- `CompliantERC20.sol`: ERC20 with roles, mint, SBT based compliance enforcement
- `MizuhikiVerified.sol`: Interface for implementing Mizuhiki Verified SBT check before regulated activity

## Addresses to test transfer and minting

You can use these addresses to test minting and transfer of the Compliant ERC20 token to an address without he Mizuhiki Verified Token, and with the Mizuhiki Verified Token. Note that the sender/minter also needs to have the Mizuhiki Verified Token in order for the transfer to success.

- Without the Mizuhiki Verified Token: `0x668C380cd31b8508Bb59891feA284e4693F1cA9D`
- With the Mizuhiki Verified Token: `0x6DDEcf986AEF2fdd49E41F7EDFE70331BDB42b1F`

## 🧰 Other Commands

```bash
npm run compile     # Compile contracts
npm run lint        # Lint TypeScript
npm run lint:sol    # Lint Solidity
npm run coverage    # Show test coverage
npm run node        # Start local Hardhat node
```

---

## 🌐 Supported Networks

- `hardhat` (local dev)
- `kaigan` (JSC testnet)

---

## 🔐 Environment Variables (`.env`)

```env
# Required: deploy contracts and mint tokens
PRIVATE_KEY=your_private_key_here

# Required: RPC endpoint
JSC_RPC_KEY=YOUR_JSC_RPC_ENDPOINT

# Required: Mizuhiki Verified SBT contract address
SBT_CONTRACT_ADDRESS=SBT_ADDRESS
```
