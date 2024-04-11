const Child = artifacts.require("Child");

module.exports = function(deployer) {
  deployer.deploy(Child);
};