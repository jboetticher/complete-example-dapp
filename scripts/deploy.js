const hre = require("hardhat");

async function main() {
  const MintableERC20 = await hre.ethers.getContractFactory("Lock");
  const token = await MintableERC20.deploy();

  await token.deployed();

  console.log(
    `Deployed to ${token.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
