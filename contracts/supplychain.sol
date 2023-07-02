// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Product.sol";
import "./Label.sol";
import "./Ownable.sol";
import "./Label.sol";

contract Supplychain {
    
    string public name;

    mapping (address => Product) products;
    mapping (address => Label) labels;

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

    event ProductCreated(
        address indexed productAddress
    );


    function getProduct(address _id) public view returns (
        string memory _name,
        uint carbonFootprint,
        string memory swarmStorageAddress,
        address[] memory _labels,
        address[] memory predecessors,
        address[] memory successors
    ) {
        Product p = products[_id];
        return (
            p.name(),
            p.carbonFootprint(),
            p.swarm_storage_address(),
            p.Get_LabelIDs(),
            p.Get_Predecessors(),
            p.Get_Successors()
        );
    }
    
    function addLabel(address _id, string memory _name, uint _productId) public {
        require(!labels[_id].IsValue(), "Label with this ID already exists");
        labels[_id] = new Label(_name, _productId);
        // ToDo: Handshake
        emit LabelAdded(msg.sender, _id, _name);
    }

    function addProduct(
        string memory _name,
        uint _carbonFootprint,
        address[] memory _labelIDs,
        address[] memory _successors,
        address[] memory _predecessors,
        string memory _ipfsAddress
    ) public returns (address) {
        Product prod = new Product(_name, _carbonFootprint);
        prod.Set_SuccessorIds(_successors);
        prod.Set_PredecessorIds(_predecessors);
        prod.Set_CarbonFootPrint(_carbonFootprint);
        prod.Set_LabelIds(_labelIDs);
        prod.Set_IPFS(_ipfsAddress);

        products[address(prod)] = prod;

        emit ProductCreated(address(prod));

        return address(prod);
    }

    function addLink(address _predecessorProduct, address _successorProduct) public returns(bool handshake_complete)  {
        Product predecessor = products[_predecessorProduct]; 
        if(msg.sender == predecessor.owner())
        {
            return predecessor.Do_Handshake_To_Successor(_successorProduct);
        }

        Product successor = products[_successorProduct];
        if(msg.sender == successor.owner()){
             return successor.Do_Handshake_To_Predecessor(_predecessorProduct);
        }

        //throw errer
        require(false, "Message sender is not the owner of either product");
    }

    function removeLink(address _predecessorProductId, address _successorProductId) public {
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

        emit LinkRemoved(msg.sender, _predecessorProductId, _successorProductId);
    }

}
