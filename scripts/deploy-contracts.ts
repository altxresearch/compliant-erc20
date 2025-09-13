import { ethers } from "hardhat";

async function main() {
  console.log("Network:", (await ethers.provider.getNetwork()).name);

  const CompliantERC20 = await ethers.getContractFactory("CompliantERC20");

  // Deploy ERC20 Token

  const name = "My Token"; // You can customize the token name
  const symbol = "MTK"; // You can customize the token symbol
  const initialSupply = ethers.parseEther("1000000"); // 1 million tokens
  const tokenResult = await CompliantERC20.deploy(
    name,
    symbol,
    initialSupply
  )
  await tokenResult.waitForDeployment();
  console.log();
  console.log("ERC20 Contract deployed at:", await tokenResult.getAddress());
  console.log("Please add this address to your .env file as ERC20_CONTRACT_ADDRESS");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
