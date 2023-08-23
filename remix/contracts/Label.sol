// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Handshaker.sol";

contract Label is Handshaker{
    bool IsValue;
    string Name;
    string Ipfs_address;
    string ImageCid;
    address[] ProductIds;

    constructor(string memory _name, string memory _imageCid, address _owner) {
        Owner = _owner;
        Name = _name;
        ImageCid = _imageCid;
        IsValue= true;
    }

    function Set_IPFS(string calldata _ipfsAddress) public onlyOwner{
        Ipfs_address = _ipfsAddress;
    }

    function Get_Name() public view returns(string memory){
        return Name;
    }

    function Get_ProductIds() public view returns(address[] memory){
        return Ids[relation.PRODUCT];
    }

    function Get_IpfsAddress() external view returns(string memory){
        return Ipfs_address;
    }

    function Get_ImageCid() external view returns(string memory){
        return ImageCid;
    }
}
