require("@nomicfoundation/hardhat-toolbox");

const { privateKey } = require('./secrets.json');

module.exports = {
  solidity: "0.8.17",
  networks: {
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287, // 0x507 in hex,
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 2000000000
    }
  }
};
