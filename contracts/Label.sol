// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Handshaker.sol";

contract Label is Handshaker{
    bool IsValue;
    string Name;
    string Swarm_storage_address;

    address[] ProductIds;


    constructor(string memory _name, address _owner) {
        Owner = _owner;
        Name = _name;
        IsValue= true;
    }

    function Set_IPFS(string calldata _ipfsAddress) public onlyOwner{
        Swarm_storage_address = _ipfsAddress;
    }
}
