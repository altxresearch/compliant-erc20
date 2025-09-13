import { ethers } from "hardhat";
import { CompliantERC20 } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();

  const contractAddr = process.env.ERC20_CONTRACT_ADDRESS;
  if (!contractAddr) {
    throw new Error("ERC20_CONTRACT_ADDRESS environment variable is not set");
  }
  console.log(`Checking balance for address: ${deployer.address}`);
  console.log(`Contract address: ${contractAddr}`);

  const ERC20contract = await ethers.getContractAt("CompliantERC20", contractAddr, deployer) as CompliantERC20;

  const balanceOf = await ERC20contract.balanceOf(deployer.address);
  
  console.log(`Balance: ${ethers.formatEther(balanceOf)} tokens`);
  console.log(`Balance (raw): ${balanceOf.toString()} wei`);
}

main().catch((e) => (console.error(e), (process.exitCode = 1)));