import { ethers } from "hardhat";
import { CompliantERC20 } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddr = process.env.ERC20_CONTRACT_ADDRESS;
  if (!contractAddr) {
    throw new Error("ERC20_CONTRACT_ADDRESS environment variable is not set");
  }
  
  const ERC20contract = await ethers.getContractAt("CompliantERC20", contractAddr, deployer) as CompliantERC20;
  
  const unVerifiedAddress = "0x668C380cd31b8508Bb59891feA284e4693F1cA9D" // non-KYCed address on Kaigan
  const verifiedAddress = "0x6DDEcf986AEF2fdd49E41F7EDFE70331BDB42b1F"; // KYCed address on Kaigan
  const amount = ethers.parseEther("10");
  
  console.log(`Transferring 10 tokens to ${verifiedAddress}...`);

  const tx = await ERC20contract.transfer(verifiedAddress, amount);
  const receipt = await tx.wait();
  
  console.log(`✅ Transfer complete. Tx: ${tx.hash}`);
  
  // Log the Transfer event
  const transferEvent = receipt?.logs.find(log => {
    try {
      const parsed = ERC20contract.interface.parseLog(log);
      return parsed?.name === "Transfer";
    } catch { return false; }
  });

  if (transferEvent) {
    const parsed = ERC20contract.interface.parseLog(transferEvent);
    if (parsed) {
      console.log(`📋 Event: ${parsed.args.from} → ${parsed.args.to} (${ethers.formatEther(parsed.args.value)} tokens)`);
    }
  }

  console.log();

  console.log(`Transferring 10 tokens to unverified address ${unVerifiedAddress}...`);
  try {
    const failedTx = await ERC20contract.transfer(unVerifiedAddress, amount);
    await failedTx.wait();
    console.log(`✅ Transfer complete. Tx: ${failedTx.hash}`);
  } catch (e) {
    if (e instanceof Error) {
      console.log("❌ Transfer failed due to missing SBT:", e.message);
    } else {
      console.log("❌ Transfer failed due to missing SBT:", e);
    }
  }
}

main().catch((e) => (console.error(e), (process.exitCode = 1)));
