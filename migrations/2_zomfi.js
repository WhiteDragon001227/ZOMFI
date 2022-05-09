const ZomFi = artifacts.require("ZomFi");

module.exports = function (deployer) {
  deployer.deploy(ZomFi, "Zomfi", "ZOMFI");
};
