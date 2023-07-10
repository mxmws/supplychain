// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Handshaker.sol";

contract Product is Handshaker{
    

    bool IsValue;
    string Name;

    string Ipfs_Address;

    uint CarbonFootprint;

    string Swarm_storage_address;
    
    mapping(uint256 => Product) public products;
    mapping(address => uint256[]) public userProducts;


    constructor(string memory _name, uint _carbonFootprint, address _owner) {
        Owner = _owner;
        Name = _name;
        CarbonFootprint = _carbonFootprint;
        IsValue= true;

    }
    //region setter functions
    function Set_Name(string calldata new_name) public onlyOwner{
        Name = new_name;
    }
    //SUPPLYCHAIN CONTRACT BECOMES TOO BIG IF THIS WAY OF OWNERSHIP TEST GETS IMPLEMENTED:
    // function Set_Name(string calldata new_name, address _owner) public onlyOwner{
    //     require(instance.Owner == _owner, "Sender is not the owner of this product" );
    //     instance.Name = new_name;
    // }

    

    function Set_CarbonFootPrint(uint new_CarbonFootprint) public onlyOwner{
        CarbonFootprint = new_CarbonFootprint;
    }

    function Set_IsValue(bool value) public onlyOwner{
        IsValue = value;
    }

    function Set_IPFS(string calldata _ipfsAddress) public onlyOwner{
        Ipfs_Address = _ipfsAddress;
    }
    //endregion setter functions

    //region getter functios
    function Get_Successor_Count() external view returns(uint256){
        return Ids[relation.SUCCESSOR].length;
    }

    function Get_Predecessor_Count() external view returns(uint256){
        return Ids[relation.PREDECESSOR].length;
    }

    function Get_Predecessors() external view returns(address[] memory){
        return Ids[relation.PREDECESSOR];
    }
    function Get_Successors() external view returns(address[] memory){
        return Ids[relation.SUCCESSOR];
    }
    function Get_LabelIDs() external view returns(address[] memory){
        return Ids[relation.LABEL];
    }

    function Get_IpfsAddress() external view returns(string memory){
        return Ipfs_Address;
    }

    function Get_Name() external view returns (string memory){
        return Name;
    }

    function Get_IsValue() external view returns(bool){
        return IsValue;
    }

    function Get_CarbonFootprint() external  view returns(uint){
        return CarbonFootprint;
    }

    // endregion getter functions

}
