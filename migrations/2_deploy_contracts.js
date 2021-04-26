const Alphacointract = artifacts.require("Alphacointract.sol");
const Ico = artifacts.require("Ico.sol");

module.exports = function (deployer) {
  deployer.deploy(Alphacointract).then(function(){
  	  return deployer.deploy(Ico, Alphacointract.address);
  });

}
