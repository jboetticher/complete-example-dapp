// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintableERC20 is ERC20, Ownable {
    event MintOccurred(address minter, uint256 amount);

    error FailedToSendEtherToOwner();
    error MustMintOverZero();
    error MintRequestOverMax();

    uint256 public constant MAX_TO_MINT = 1000 ether;
    uint256 public constant NATIVE_TO_TOKEN = 1 ether;

    constructor() ERC20("Mintable ERC 20", "MERC") {}

    /**Allows the creator of the ERC20 to withdraw funds from minters. */
    function withdraw() onlyOwner external {
        (bool success, ) = owner().call{value: address(this).balance}("");
        if(!success) revert FailedToSendEtherToOwner();
    }

    /**Purchases some of the token with native gas currency. */
    function purchaseMint() payable external {
        uint256 amountToMint = msg.value / NATIVE_TO_TOKEN;
        if(amountToMint == 0) revert MustMintOverZero();
        if(amountToMint + totalSupply() > MAX_TO_MINT) revert MintRequestOverMax();
        
        _mint(msg.sender, amountToMint);
        emit MintOccurred(msg.sender, amountToMint);
    }
}
