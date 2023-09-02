# DeFi Borrowing and Lending Application

## Introduction

This is a decentralized finance (DeFi) application for borrowing and lending digital assets. Built on top of Ethereum, the platform aims to provide users with a seamless and trustless borrowing and lending experience. Utilizing smart contracts, the application lets users deposit assets to earn interest or borrow assets for a specified period.

---

## Features

- Borrow digital assets
- Lend digital assets to earn interest
- Liquidation of unhealthy loans
- Governance for updating system parameters

---

## Prerequisites

- [Node.js](https://nodejs.org/en/) v18.x.x or above
- [NPM](https://www.npmjs.com/) as your package manager
- [MetaMask](https://metamask.io/) browser extension or similar Ethereum wallet
- [Hardhat](https://hardhat.org/) Ethereum development environment
- [Solidity](https://soliditylang.org/) v0.8.x
- [Ethers.js](https://docs.ethers.io/v5/) for frontend integration 

---

## Quick Start

1. **Clone the Repository**

    ```bash
    git clone https://github.com/D3xter1922/Web3Lending.git
    cd Web3Lending
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd contrat
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Compile Smart Contracts**

    ```bash
    npx hardhat compile
    ```
    Go to `contract/artifacts/contract` and copy the ABIs of each contract, and paste them in `client/App.js`
5. **Run Local Blockchain Network**

    ```bash
    npx hardhat node
    ```

    This will start a local Ethereum network for development purposes. Keep this terminal window open.

6. **Deploy Smart Contracts**

    Open a new terminal window and navigate to the project directory.

    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

    This will deploy your contracts to your local Ethereum network. Copy the addresses of each of these contracts from the console and paste in `client/App.js`

7. **Connect MetaMask to Local Network**

    Open your MetaMask browser extension and add a custom RPC with the following details:

    - Network Name: Hardhat
    - RPC URL: http://localhost:8545
    - Chain ID: 31337

    Then, import the accounts provided by Hardhat into MetaMask to interact with the deployed contracts.

8. **Run Frontend**

    From the root directory,

    ```bash
    cd frontend
    npm install
    npm start
    ```

    Now you should be able to interact with the DeFi borrowing and lending application through the frontend interface.

---

## Documentation

- [Smart Contract Architecture](contract/contracts/CustomLending.sol)

- This contract enables users to lend, borrow, payback and withdraw CASH. For borrowing, the player must have enough GOLD in their wallet as a collateral. The rate of borrowing is fixed as 50% per day and the rate of lending is fixed as 10% per day. Maximum interest is capped at 50% of the principle amount for borrowing and 10% of the principle amount for lending.
- Future works include:
  1. Implementing default scenario
  2. Implementing a dynamic interest rate system
  3. Allowing more tokens to be borrowed or lent

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## Disclaimer

This application is still in development and should not be used for handling real assets. Always exercise caution when interacting with smart contracts in a live environment.

---

For further questions or issues, please [contact](druhinabrol@gmail.com)
