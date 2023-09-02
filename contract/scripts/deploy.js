// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  


  const CASH = await hre.ethers.deployContract("CASH");

  await CASH.waitForDeployment();

  console.log(
    `CASH deployed to ${CASH.target}`
  );

  const GOLD = await hre.ethers.deployContract("GOLD");

  await GOLD.waitForDeployment();

  console.log(
    `GOLD deployed to ${GOLD.target}`
  );

  const [deployer] = await hre.ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);

  // Define token addresses
  const collateralTokenAddress = GOLD.getAddress();
  const lendingTokenAddress = CASH.getAddress();
  const CustomLending = await hre.ethers.deployContract("CustomLending",[collateralTokenAddress,lendingTokenAddress]);

  await CustomLending.waitForDeployment();

  console.log(
    `CustomLending deployed to ${CustomLending.target}`
  );
  const FreeTokens = await hre.ethers.deployContract("FreeTokens",[collateralTokenAddress,lendingTokenAddress]);

  await FreeTokens.waitForDeployment();

  console.log(
    `FreeTokens deployed to ${FreeTokens.target}`
  );

  // // Deploy the contract
  // const CustomLending = await hre.ethers.getContractFactory("CustomLending");
  // const customLendingInstance = await CustomLending.deploy(collateralTokenAddress, lendingTokenAddress);

  // // Wait for deployment to finish
  // await customLendingInstance.waitForDeployment();

  // console.log("CustomLending deployed to:", customLendingInstance.getAddress());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
