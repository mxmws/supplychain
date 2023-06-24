// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Ownable.sol";

contract Product is Ownable{
    
    bool public isValue  = false;
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

    constructor(string memory _name, uint _carbonFootprint) Ownable() {
        name = _name;
        carbonFootprint = _carbonFootprint;
        isValue= true;
    }
    //region setter functions
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
    //endregion setter functions

    //region getter functios
    function Get_Successor_Count() external view returns(uint256){
        return successorIds.length;
    }

    function Get_Predecessor_Count() external view returns(uint256){
        return predecessorIds.length;
    }
    // endregion getter functions

    //region hand shake
    function Has_SuccessorCandidate(address successorAddress) public view returns(bool){
        return successorIdIsHandshakeCandidate[successorAddress];
    }

    function Has_PredecessorCandidate(address predecessorAddress) public view returns(bool){
        return successorIdIsHandshakeCandidate[predecessorAddress];
    }
    
    function Accept_SuccessorCandidate() external {
        require(successorIdIsHandshakeCandidate[msg.sender] == true, "Requestor is not a candidate for successorship.");

        successorIdIsHandshakeCandidate[msg.sender] = false;

    }

    function Accept_PredecessorCandidate() external {
        require(predecessorIdIsHandshakeCandidate[msg.sender] == true, "Requestor is not a candidate for predecessorship.");
        predecessorIdIsHandshakeCandidate[msg.sender] = false;
    }

    function Do_Handshake_To_Successor(address successor_address) public returns(bool){
        Product successor = Product(successor_address);

        if(successor.Has_PredecessorCandidate(address(this))){
            successorIds.push(successor_address);
            successor.Accept_PredecessorCandidate();
            return true;
        }
        else{
            successorIdIsHandshakeCandidate[successor_address] = true;
            return false;
        }
    }
    
    function Do_Handshake_To_Predecessor(address predecessor_address) public returns(bool){
        Product predecessor = Product(predecessor_address);

        if(predecessor.Has_PredecessorCandidate(address(this))){
            predecessorIds.push(predecessor_address);
            predecessor.Accept_SuccessorCandidate();

            return true;
        }
        else{
            predecessorIdIsHandshakeCandidate[predecessor_address];
            return false;
        }
    }
    //endregion hand shake
}