import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";
import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { ethers } from "ethers";
dotenv.config();

const PK = process.env.PRIVATE_KEY || ethers.constants.AddressZero;

const config: HardhatUserConfig = {
    solidity: "0.8.0",
    networks: {
        // polygon: {
        //     url: "https://polygon-rpc.com/",
        //     accounts: [process.env.PRIVATE_KEY as string],
        //     gasPrice: "auto", // if txs failing, set manual fast gas price
        // },
        // mumbai: {
        //     url: "https://rpc-mumbai.maticvigil.com",
        //     accounts: [process.env.PRIVATE_KEY as string],
        //     gasPrice: "auto",
        // },
        bsc_testnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            chainId: 97,
            accounts: [PK],
            gas: 2100000,
            gasPrice: "auto",
        },
        bsc_mainnet: {
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            accounts: [PK],
            gas: 2100000,
            gasPrice: "auto",
        },
    },
    // even if verifying on polygonscan, property name should be etherscan only, only apiKey should change
    etherscan: {
        apiKey: process.env.EXPLORER_API_KEY || "",
    },
};

export default config;
