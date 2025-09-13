import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const sbtContractAddress = process.env.SBT_CONTRACT_ADDRESS;
  if (!sbtContractAddress) {
    throw new Error("SBT_CONTRACT_ADDRESS environment variable is not set");
  }

  console.log("Network:", (await ethers.provider.getNetwork()).name);

  const AccessManager = await ethers.getContractFactory("AccessManager");
  const CompliantERC20 = await ethers.getContractFactory("CompliantERC20");

  // Deploy Access Manager

  const accessManagerContract = await AccessManager.deploy(deployer.address); 
  await accessManagerContract.waitForDeployment();
  console.log("Access Manager deployed at:", await accessManagerContract.getAddress());

  // Deploy Compliant ERC20 Token, with Mizuhiki Verified SBT Contract Address, and accessManager_InitialAdmin passed in

  const name = "My Token"; // You can customize the token name
  const symbol = "MTK"; // You can customize the token symbol
  const initialSupply = ethers.parseEther("1000000"); // 1 million tokens
  const tokenResult = await CompliantERC20.deploy(
    accessManagerContract.target,
    sbtContractAddress,
    name,
    symbol,
    initialSupply
  )
  await tokenResult.waitForDeployment();
  console.log();
  console.log("Compliant ERC20 Contract deployed at:", await tokenResult.getAddress());
  console.log("Please add this address to your .env file as ERC20_CONTRACT_ADDRESS");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
