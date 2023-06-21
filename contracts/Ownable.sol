// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.18;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, 'caller must be owner');
        _;
    }

    function ChangeOwnership(address newOwner) public  onlyOwner{
        owner = newOwner;
    }
}