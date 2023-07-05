// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Product.sol";
import "./Label.sol";
import "./Ownable.sol";
import "./Label.sol";

contract Supplychain {
     
    mapping (address => Product) products;
    mapping (address => Label) labels;


    event ContractAdded(
        string ContractType,
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
            p.Get_Name(),
            p.Get_CarbonFootprint(),
            p.Get_IpfsAddress(),
            p.Get_LabelIDs(),
            p.Get_Predecessors(),
            p.Get_Successors()
        );
    }
    
    function addLabel(address _id, string memory _name, uint _productId) public {
        require(!labels[_id].IsValue(), "Label with this ID already exists");
        labels[_id] = new Label(_name, _productId);
        // ToDo: Handshake
        emit ContractAdded("Label", msg.sender, _id, _name);
    }

    function addProduct(
        string memory _name,
        uint _carbonFootprint,
        address[] memory _labelIDs,
        address[] memory _successors,
        address[] memory _predecessors,
        string memory _ipfsAddress
    ) public returns (address) {
        Product prod = new Product(_name, _carbonFootprint, msg.sender);

        prod.Set_SuccessorCandadiateIds(_successors);
        prod.Set_PredecessorCandidateIds(_predecessors);
        prod.Set_CarbonFootPrint(_carbonFootprint);
        prod.Set_LabelIds(_labelIDs);
        prod.Set_IPFS(_ipfsAddress);

        products[address(prod)] = prod;

        emit ProductCreated(address(prod));

        return address(prod);
    }

    event CheckpointReached(
        string name,
        uint16 line
    );

    function addLink(address _predecessorProduct, address _successorProduct) public returns(bool handshake_complete)  {

        Product predecessor = products[_predecessorProduct]; 
        Product successor = products[_successorProduct];

        if(msg.sender == predecessor.Get_Owner())
        {
            bool success = predecessor.Do_Handshake_To_Successor(_successorProduct);            
        
            if(predecessor.Get_Owner() != successor.Get_Owner())
            return success;
        }

        if(msg.sender == successor.Get_Owner())
        {
            bool success =  successor.Do_Handshake_To_Predecessor(_predecessorProduct);
            
            return success;
        }
        else{
            //throw 
            require(false, "Message sender is not the owner of either product");
        }
    }

    function removeLink(address _predecessorProductId, address _successorProductId) public {
        // check if both products exist
        require(products[_predecessorProductId].Get_IsValue() && products[_successorProductId].Get_IsValue(), "One or both products don't exist");
        // get products
        Product predecessor = products[_predecessorProductId];
        Product successor = products[_successorProductId];

        require(msg.sender == predecessor.Get_Owner() || msg.sender == successor.Get_Owner(), "Links can only be removed by either of the owners");
        // remove links from products
        predecessor.Remove_Successor(_successorProductId);
        successor.Remove_Predecessor(_predecessorProductId);

        emit LinkRemoved(msg.sender, _predecessorProductId, _successorProductId);
    }

    //CONTRACT BECOMES TOO LARGE IF ANOTHER METHOD IS ADDDED 

    // function Change_Name(string calldata name, address productId) public {
    //     Product product = products[productId];
    //     require(msg.sender == product.Get_Owner(), "Sender is not the owner of this product" );
    //      product.Set_Name(name);
    //  }
}
