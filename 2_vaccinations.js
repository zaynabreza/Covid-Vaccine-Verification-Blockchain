const Vaccinations = artifacts.require("Vaccinations");

module.exports = function (deployer, network, accounts) {
  const a1=accounts[0];
  const a2=accounts[1];
  const a3=accounts[2];
  deployer.deploy(Vaccinations,a1,a2,a3);
};
