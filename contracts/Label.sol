// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Handshaker.sol";

contract Label is Handshaker{
    struct Instance {
        address Owner;
        bool IsValue;
        string Name;
        string Ipfs_Address;

        mapping(address => bool) ProductIdIsHandshakeCandidate;
        address[] ProductIds;
    }

    Instance public instance;
    

    constructor(string memory _name, address _owner) {
        instance.Owner = _owner;
        instance.Name = _name;
        instance.IsValue= true;

    }

    function Set_IPFS(string calldata _ipfsAddress) public onlyOwner{
        instance.Ipfs_Address = _ipfsAddress;
    }

    function Set_ProductIds(address[] calldata new_ProductIds) public onlyOwner{
        instance.ProductIds = new_ProductIds;
    }

    function IsValue() public view returns(bool){
        return instance.IsValue;
    }

    function Name() public view returns(string memory){
        return instance.Name;
    }
}
