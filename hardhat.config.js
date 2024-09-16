require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: '0.8.20',
  networks: {
    sepolia: {
      url: 'https://ethereum-sepolia.blockpi.network/v1/rpc/public',
      accounts: [process.env.PRIVATE_KEY]
    },
    amoy: {
      url: 'https://polygon-amoy.blockpi.network/v1/rpc/public',
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
