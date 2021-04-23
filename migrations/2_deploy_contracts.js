const Alphacointract = artifacts.require("Alphacointract.sol");

module.exports = function (deployer) {
  deployer.deploy(Alphacointract);
};
