const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/helloNFT.sol/helloNFT.json");

const tokenAddress = "0x158c990E9E84d15a6A4B657f852bc55f30297239"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x71Ab164136688cF0b694c854e24297550E3a3467";

async function main() {
    // Get the contract instance
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    // Fetch the balance of the specified address
    const balance = await token.balanceOf(walletAddress);

    // Convert BigNumber to string for logging
    console.log(`You now have: ${balance.toString()} NFTs in your wallet`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
