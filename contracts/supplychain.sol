// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Product.sol";
import "./Label.sol";
import "./Ownable.sol";
import "./Label.sol";

contract Supplychain is Ownable {
    
    string public name;

    mapping (address => Product) products;
    mapping (address => Label) labels;


    constructor (string memory _name) Ownable() {
        name=_name;
    }

    event ProductAdded(
        address indexed _user,
        address _id,
        string _name
    );

    event LabelAdded (
        address indexed _user,
        address _id,
        string _name
    );

    event LinkAdded(
        address indexed _user,
        address _predecessorProductId,
        address _successorProductId
    );

    event LinkRemoved(
        address indexed _user,
        address _predecessorProductId,
        address _successorProductId
    );

    // this function shouldn't cost gas (not sure why it says infinite)
    function getProduct(address _id) public view returns(Product){
        // require(labels[_id].GetOwner() != address(0), "Product doesn't exist");
        Product myProduct = products[_id];
        return myProduct;
    }
    
    function addLabel(address _id, string memory _name, uint _productId) public {
        require(!labels[_id].IsValue(), "Label with this ID already exists");
        labels[_id] = new Label(_name, _productId);
        // ToDo: Handshake
        emit LabelAdded(msg.sender, _id, _name);
    }

    function addProduct(address _address, string memory _name, address[] memory _successors, address[] memory _predecessors, uint _carbonFootprint) public {
        require(products[_address].owner() != address(0), "Product with this ID already exists");

        // this is probably not the best way to do it but can't use constructor because struct contains mappings
        Product prod = new Product(_name, _carbonFootprint);
        prod.Set_SuccessorIds(_successors);
        prod.Set_PredecessorIds(_predecessors);
        prod.Set_CarbonFootPrint(_carbonFootprint);

        // ToDo: Handshake
        emit ProductAdded(msg.sender, _address, _name); // event will be on the blockchain forever
    }

    function addLink(address _predecessorProductId, address _successorProductId) public  {
        // ToDo: Handshake / checking ownership
        //1. check product in othter contract if self was added as candidate   
            //no: enter other address into respective candidate mapping
            //return
        //2. yes: delete self in other candidate mapping
        //3. update own successor/predecessor mapping
        //4. update other successor/predecessor mapping
            //--> how to handle ownership and stop attackers from deleting random products
        
        // ToDo: make sure link doesn't exist yet
        

        // check if both products exist
        Product predecessor = products[_predecessorProductId]; 
        Product successor = products[_successorProductId];
        require(predecessor.isValue() && successor.isValue(), "One or both products don't exist");

        if(predecessor.Do_Handshake_To_Successor(_successorProductId)){
            //handshake successfull, predecessor_candidate of successor was removed (set to false)
        }
        else{
            successor.Do_Handshake_To_Predecessor(_predecessorProductId);
        }

        emit LinkAdded(msg.sender, _predecessorProductId, _successorProductId);
    }

    function removeLink(address _predecessorProductId, address _successorProductId) public {
        // Todo: Problem: searching an array can be very expensive
        // check if both products exist
        require(products[_predecessorProductId].isValue() && products[_successorProductId].isValue(), "One or both products don't exist");

        // get products
        Product predecessor = products[_predecessorProductId];
        Product successor = products[_successorProductId];

        // remove links from products
        uint predecessorIndex;
        uint successorIndex;

        // find index of _successorProductId in predecessor's successors
        for (uint i = 0; i < predecessor.Get_Successor_Count(); i++) {
            if (predecessor.successorIds(i) == _successorProductId) {
                predecessorIndex = i;
                break;
            }
        }

        // find index of _predecessorProductId in successor's predecessors
        for (uint i = 0; i < successor.Get_Predecessor_Count(); i++) {
            if (successor.predecessorIds(i) == _predecessorProductId) {
                successorIndex = i;
                break;
            }
        }

        // remove the links
        // delete products[_predecessorProductId].successorIds[predecessorIndex];
        // delete products[_successorProductId].predecessorIds[successorIndex];

        emit LinkRemoved(msg.sender, _predecessorProductId, _successorProductId);
    }

}
