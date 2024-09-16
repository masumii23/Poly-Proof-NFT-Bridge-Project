const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/helloNFT.sol/helloNFT.json");

const NUMBER_OF_TOKENS = 5; 
const tokenAddress = "0x4Fc026C3Eb0Ba37E83BDC9449A4c1F99BC5e666C"; 
const tokenABI = tokenContractJSON.abi;
const fxERC721RootTunnel = "0x9E688939Cb5d484e401933D850207D6750852053"; 
const walletAddress = "0x71Ab164136688cF0b694c854e24297550E3a3467";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress, deployer);
  const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC721RootTunnel, deployer);

  // Approve the FxERC721RootTunnel to manage NFTs
  const approveTx = await tokenContract.setApprovalForAll(fxERC721RootTunnel, true);
  await approveTx.wait();
  console.log("Approval confirmed");

  // Deposit NFTs to the FxPortal bridge
  for (let i = 0; i < NUMBER_OF_TOKENS; i++) {
    const depositTx = await fxContract.deposit(tokenAddress, walletAddress, i, "0x6556");
    await depositTx.wait();
    console.log(`Depositing token ID ${i}: Successful`);
  }

  console.log("All tokens deposited successfully");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
