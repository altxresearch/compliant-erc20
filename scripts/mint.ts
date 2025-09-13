import { ethers } from "hardhat";
import { CompliantERC20 } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const unverifiedAddress = "0x668C380cd31b8508Bb59891feA284e4693F1cA9D"; // non-KYCed address on Kaigan

  const contractAddr = process.env.ERC20_CONTRACT_ADDRESS;
  if (!contractAddr) {
    throw new Error("ERC20_CONTRACT_ADDRESS environment variable is not set");
  }


  const token = (await ethers.getContractAt("CompliantERC20", contractAddr, deployer)) as CompliantERC20;

  console.log("Minting 1000 tokens to verified address:", deployer.address);
  const tx = await token.mint(deployer.address, ethers.parseEther("1000"));
  await tx.wait();
  console.log("✅ Tokens minted. Tx:", tx.hash);

  console.log();

  console.log("Minting 1000 tokens to unverified address:", unverifiedAddress);
  try {
    const failedTx = await token.mint(unverifiedAddress, ethers.parseEther("1000"));
    await failedTx.wait();
    console.log("✅ Tokens minted. Tx:", failedTx.hash);
  } catch (e) {
    if (e instanceof Error) {
      console.log("❌ Minting failed due to missing SBT:", e.message);
    } else {
      console.log("❌ Minting failed due to missing SBT:", e);
    }
  }
}

main().catch((e) => (console.error(e), (process.exitCode = 1)));
