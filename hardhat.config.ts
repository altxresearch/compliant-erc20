import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.30",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    kaigan: {
      // JSC_RPC_KEY can be either:
      // 1. A raw token value (e.g. abcdef123456) -> will be expanded into the standard endpoint
      // 2. A full URL (e.g. https://rpc.kaigan.jsc.dev/rpc?token=abcdef123456)
      // Any value starting with http(s) is treated as a full URL.
      url: (() => {
        const raw = process.env.JSC_RPC_KEY?.trim();
        if (!raw) return ""; // Default Hardhat fallback (no network URL configured)
        if (/^https?:\/\//i.test(raw)) return raw; // Already a full URL
        return `https://rpc.kaigan.jsc.dev/rpc?token=${raw}`; // Treat as token
      })(),
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 5278000,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
};

export default config;
