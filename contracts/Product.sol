// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Ownable.sol";

contract Product is Ownable{
    
    bool public isValue;
    string public name;

    mapping(address => bool) public successorIdIsHandshakeCandidate;
    mapping(address => bool) public predecessorIdIsHandshakeCandidate;

    mapping(uint => uint) public successorIdToArrayIndex;
    mapping(uint => uint) public predecessorIdToArrayIndex;

    address[] public successorIds; 
    address[] public predecessorIds;

    address[] public labelIds;

    uint public carbonFootprint;

    string public swarm_storage_address;

    function return_int() public returns(int){
        return 0;
    }
    function Set_Name(string calldata new_name) public onlyOwner{
        name = new_name;
    }

    function Set_SuccessorIds(address[] calldata new_successorIds) public onlyOwner{
        successorIds = new_successorIds;
    }

    function Set_PredecessorIds(address[] calldata new_predecessorIds) public onlyOwner{
        successorIds = new_predecessorIds;
    }

    function Set_LabelIds(address[] calldata new_LabelIds) public onlyOwner{
        successorIds = new_LabelIds;
    }

    function Set_CarbonFootPrint(uint new_CarbonFootprint) public onlyOwner{
        carbonFootprint = new_CarbonFootprint;
    }

    function Set_IsValue(bool value) public onlyOwner{
        isValue = value;
    }

    // function Append  
    
}