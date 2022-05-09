import { ethers } from "hardhat";
import { expect } from "chai";
import { ZomFi, ZomFi__factory } from "../typechain";
import { Signer } from "ethers";

describe("ZomFi token tests", () => {
    let zomfi: ZomFi, zomfiFactory: ZomFi__factory;
    let adminSigner: Signer, aliceSigner: Signer, bobSigner: Signer;
    let admin: string, alice: string, bob: string;
    before(async () => {
        zomfiFactory = await ethers.getContractFactory("ZomFi");
        zomfi = await zomfiFactory.deploy("ZomFi","ZOMFI");
    });
    beforeEach(async () => {
        [adminSigner, aliceSigner, bobSigner] = await ethers.getSigners();
        admin = await adminSigner.getAddress();
        alice = await aliceSigner.getAddress();
        bob = await bobSigner.getAddress();
    });
    it("sets correct token name", async () => {
        expect(await zomfi.name()).eq("ZomFi");
    });
    it("sets correct token symbol", async () => {
        expect(await zomfi.symbol()).eq("ZOMFI");
    });
    it("sets correct token decimals", async () => {
        expect(await zomfi.decimals()).eq(18);
    });
    it("sets correct total supply", async () => {
        expect(await zomfi.cap()).eq(ethers.utils.parseEther("500000000"));
    });
    it("mints on deployment", async () => {
        expect(await zomfi.balanceOf(admin)).eq(ethers.utils.parseEther("8325000"));
    });
    it("owner can increase circulating supply", async () => {
        await expect(zomfi.mint(ethers.utils.parseEther("8325000"))).to.emit(zomfi, "Transfer");
        expect(await zomfi.totalSupply()).eq(ethers.utils.parseEther("16650000"));
    });
    it("owner can not mint token more than total supply", async () => {
        await expect(zomfi.mint(ethers.utils.parseEther("500000000"))).to.be.revertedWith("ERC20Capped: cap exceeded");
    });
    it("transfers to other address", async () => {
        await expect(zomfi.transfer(alice, 1000)).to.emit(zomfi, "Transfer").withArgs(admin, alice, 1000);
    });
    it("doesn't allow to transfer if insufficient balance", async () => {
        await expect(zomfi.connect(aliceSigner).transfer(bob, 1001)).to.be.reverted;
    });
    it("doesn't allow transferring to 0 address", async () => {
        await expect(zomfi.transfer(ethers.constants.AddressZero, 1000)).to.be.reverted;
    });
    it("sets correct allowance", async () => {
        await zomfi.approve(alice, 1000);
        expect(await zomfi.allowance(admin, alice)).eq(1000);
    });
    it("allows to transferFrom", async () => {
        await zomfi.approve(alice, 1000);
        await zomfi.connect(aliceSigner).transferFrom(admin, bob, 1000);
        expect(await zomfi.balanceOf(bob)).eq(1000);
    });
    it("doesn't allow to transferFrom if insufficient allowance", async () => {
        await zomfi.approve(alice, 1000);
        await expect(zomfi.connect(aliceSigner).transferFrom(admin, bob, 1001)).to.be.reverted;
    });


});
