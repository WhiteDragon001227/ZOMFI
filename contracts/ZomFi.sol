// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol';

contract ZomFi is ERC20Capped, Ownable {
    
    constructor(string memory name, string memory symbol) ERC20Capped(500000000 ether) ERC20(name, symbol)  {
        ERC20._mint(_msgSender(), 8325000 ether); // 8 mil
    }
    
    function mint(uint256 amount) external onlyOwner{
        ERC20Capped._mint(_msgSender(), amount);
    }
}