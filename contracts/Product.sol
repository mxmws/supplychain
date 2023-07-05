// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Ownable.sol";

contract Product is Ownable{

    struct Instance{
        address Owner;
        bool IsValue;
        string Name;
        mapping(address => bool) SuccessorIdIsHandshakeCandidate;
        mapping(address => bool) PredecessorIdIsHandshakeCandidate;

        mapping(uint => uint) SuccessorIdToArrayIndex;
        mapping(uint => uint) PredecessorIdToArrayIndex;

        address[] SuccessorIds; 
        address[] PredecessorIds;

        address[] LabelIds;

        string Ipfs_Address;

        uint CarbonFootprint;

        string Swarm_storage_address;
    }
    
    mapping(uint256 => Instance) public products;
    mapping(address => uint256[]) public userProducts;

    Instance instance;

    event ProductCreated(
        address indexed productAddress
    );

    event HandShakeDone(
        string Name,
        bool Successful
    );

    constructor(string memory _name, uint _carbonFootprint, address _owner) {
        instance.Owner = _owner;
        instance.Name = _name;
        instance.CarbonFootprint = _carbonFootprint;
        instance.IsValue= true;

        emit ProductCreated(address(this));

    }
    //region setter functions
    function Set_Name(string calldata new_name) public onlyOwner{
        instance.Name = new_name;
    }

    function Set_SuccessorIds(address[] calldata new_successorIds) public onlyOwner{
        instance.SuccessorIds = new_successorIds;
    }

    function Set_SuccessorCandadiateIds(address[] calldata new_successorIds) public onlyOwner{
       for(uint i = 0; i < new_successorIds.length; i++){
            instance.PredecessorIdIsHandshakeCandidate[new_successorIds[i]] = true;
        }
    }

    function Set_PredecessorCandidateIds(address[] calldata new_predecessorIds) public onlyOwner{
        for(uint i = 0; i < new_predecessorIds.length; i++){
            instance.PredecessorIdIsHandshakeCandidate[new_predecessorIds[i]] = true;
        }
    }

    function Set_PredecessorIds(address[] calldata new_predecessorIds) public onlyOwner{
        instance.SuccessorIds = new_predecessorIds;
    }

    function Set_LabelIds(address[] calldata new_LabelIds) public onlyOwner{
        instance.SuccessorIds = new_LabelIds;
    }

    function Set_CarbonFootPrint(uint new_CarbonFootprint) public onlyOwner{
        instance.CarbonFootprint = new_CarbonFootprint;
    }

    function Set_IsValue(bool value) public onlyOwner{
        instance.IsValue = value;
    }

    function Set_IPFS(string calldata _ipfsAddress) public onlyOwner{
        instance.Ipfs_Address = _ipfsAddress;
    }
    //endregion setter functions

    //region getter functios
    function Get_Successor_Count() external view returns(uint256){
        return instance.SuccessorIds.length;
    }

    function Get_Predecessor_Count() external view returns(uint256){
        return instance.PredecessorIds.length;
    }

    function Get_Predecessors() external view returns(address[] memory){
        return instance.PredecessorIds;
    }
    function Get_Successors() external view returns(address[] memory){
        return instance.SuccessorIds;
    }
    function Get_LabelIDs() external view returns(address[] memory){
        return instance.LabelIds;
    }

    function Get_IpfsAddress() external view returns(string memory){
        return instance.Ipfs_Address;
    }

    function Get_Name() external view returns (string memory){
        return instance.Name;
    }

    function Get_IsValue() external view returns(bool){
        return instance.IsValue;
    }

    function Get_CarbonFootprint() external  view returns(uint){
        return instance.CarbonFootprint;
    }

    function Get_Owner() external view returns(address owner){
        return instance.Owner;
    }
    // endregion getter functions

    //region hand shake
    function Has_SuccessorCandidate(address successorAddress) public view returns(bool){
        return instance.SuccessorIdIsHandshakeCandidate[successorAddress];
    }

    function Has_PredecessorCandidate(address predecessorAddress) public view returns(bool){
        return instance.SuccessorIdIsHandshakeCandidate[predecessorAddress];
    }
    
    function Accept_SuccessorCandidate() public {
        require(instance.SuccessorIdIsHandshakeCandidate[msg.sender] == true, "Requestor is not a candidate for successorship.");
        instance.SuccessorIdIsHandshakeCandidate[msg.sender] = false;
        instance.SuccessorIds.push(msg.sender);

    }

    function Accept_PredecessorCandidate() public {
        require(instance.PredecessorIdIsHandshakeCandidate[msg.sender] == true, "Requestor is not a candidate for predecessorship.");
        instance.PredecessorIdIsHandshakeCandidate[msg.sender] = false;
        instance.PredecessorIds.push(msg.sender);
    }

    function Do_Handshake_To_Successor(address successor_address) public returns(bool){
        Product successor = Product(successor_address);

        if(successor.Has_PredecessorCandidate(address(this))){
            instance.SuccessorIds.push(successor_address);
            successor.Accept_PredecessorCandidate();
            
            emit HandShakeDone("Successor", true);
            return true;
        }
        else{
            instance.SuccessorIdIsHandshakeCandidate[successor_address] = true;            
            
            emit HandShakeDone("Successor", false);
            return false;
        }
    }
    
    function Do_Handshake_To_Predecessor(address predecessor_address) public returns(bool){
        Product predecessor = Product(predecessor_address);

        if(predecessor.Has_PredecessorCandidate(address(this))){
            instance.PredecessorIds.push(predecessor_address);
            predecessor.Accept_SuccessorCandidate();
            
            emit HandShakeDone("Predecessor", true);
            return true;
        }
        else{
            instance.PredecessorIdIsHandshakeCandidate[predecessor_address];
            
            emit HandShakeDone("Predecessor", false);
            return false;
        }
    }
    //endregion handshake
}