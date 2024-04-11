const Parent = artifacts.require("Parent");
const Proxy = artifacts.require("Proxy");
module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Parent);
  const logicInstance = await Parent.deployed();
  const adminAddress = accounts[0]; // Assuming the first account is the admin
  await deployer.deploy(Proxy, logicInstance.address, adminAddress);
};

