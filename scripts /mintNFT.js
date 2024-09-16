const hre = require("hardhat");
require('dotenv').config();

const tokenContractJSON = require("../artifacts/contracts/helloNFT.sol/helloNFT.json");

const tokenAddress = "0x4Fc026C3Eb0Ba37E83BDC9449A4c1F99BC5e666C"; // contract address
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x71Ab164136688cF0b694c854e24297550E3a3467"; // your wallet address

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  // Get the contract instance of the deployed NFT contract
  const nft = await hre.ethers.getContractAt(tokenABI, tokenAddress, deployer);

  // Array of token URIs for the NFTs to be minted
  const tokenURIs = [
    "ipfs://QmWLgQHb6rUPhwdQJGbHbMNfRSrDkGmPVR9Nfa5Mm6ut3p",
    "ipfs://QmZZHc6SJQEaDsvZPLzZcLL3okyMmrmvq8TRyMzxxqJEq7",
    "ipfs://QmXQaExv873jaJw7FJ4Sjg1DuETJ3KvHNLbdp3jpUGeStG",
    "ipfs://QmbXnmzuhcMHbFvfb4iLLt4L1U6iC65kWJgqyaDsiJ9mAV",
    "ipfs://QmdCfM3L7DXCBcTuqEdApy97gu4YWpoo8nJEPP2RzgjgpN"
  ];

  // Array of prompts corresponding to each NFT
  const prompts = [
    "Imagine a solar eclipse, with a group of people watching and pointing at the sky",
    "Imagine a surfer riding super gnarly waves in a surfing competition and there are bystanders",
    "Imagine a photorealistic image of a blue alien visiting Earth in a desert for the first time, standing in front of a sign that says welcome to Earth",
    "Imagine dolphins having a business meeting, everyone is having fun, in the style of Basquiat",
    "Imagine otters swimming with turtles in the sea, there are other sea creatures around, in the style of expressionism"
  ];

  // Call the contract's batch mint function with the token URIs and prompts
  await nft.mintMultipleNFTs(tokenURIs, prompts);
  console.log(`Minted ${tokenURIs.length} NFTs to ${walletAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
