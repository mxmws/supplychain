// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.18;

import "./Ownable.sol";
import "./supplychain.sol";

contract All_Supplychains{

    //address of owner maps to all owned Supplychains
    mapping(address => Supplychain[]) supplychains;

    function AddSupplychain(string memory name) external {
        Supplychain[] storage my_supplychains = supplychains[msg.sender];
        my_supplychains.push(new Supplychain(name));

        supplychains[msg.sender] = my_supplychains;
    }
}