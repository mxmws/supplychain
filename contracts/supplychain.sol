// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Product.sol";
import "./Label.sol";

contract Supplychain {

    mapping (address => Product) products;
    mapping (address => Label) labels;


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
    
    function addLabel(
        string memory _name,
        address[] memory _ProductIDs,
        string memory _ipfsAddress
    ) public returns (address) {
        Label label = new Label(_name, msg.sender);

        label.Set_ProductIds(_ProductIDs);
        label.Set_IPFS(_ipfsAddress);

        labels[address(label)] = label;
        return address(label);
    }

    function addProduct(
        string memory _name,
        uint _carbonFootprint,
        //address[] memory _labelIDs,
        //address[] memory _successors,
        //address[] memory _predecessors,
        string memory _ipfsAddress
    ) public returns (address) {
        Product prod = new Product(_name, _carbonFootprint, msg.sender);

        //prod.Set_SuccessorCandadiateIds(_successors);
        //prod.Set_PredecessorCandidateIds(_predecessors);
        //prod.Set_LabelCandidateIds(_labelIDs);
        prod.Set_CarbonFootPrint(_carbonFootprint);
        prod.Set_IPFS(_ipfsAddress);

        products[address(prod)] = prod;

        return address(prod);
    }


    function addLink(address _predecessorProduct, address _successorProduct) public returns(bool handshake_complete)  {

        Product predecessor = products[_predecessorProduct]; 
        Product successor = products[_successorProduct];

        if(msg.sender == predecessor.Get_Owner())
        {
            bool success = predecessor.Do_Handshake(_successorProduct, relation.SUCCESSOR);            
        
            if(predecessor.Get_Owner() != successor.Get_Owner())
            return success;
        }

        if(msg.sender == successor.Get_Owner())
        {
            bool success =  successor.Do_Handshake(_predecessorProduct, relation.PREDECESSOR);
            
            return success;
        }
        else{
            //throw 
            require(false, "Message sender is not the owner of either product");
        }
    }
/*
    function removeLink(address _predecessorProductId, address _successorProductId) public {
        // check if both products exist
        require(products[_predecessorProductId].Get_IsValue() && products[_successorProductId].Get_IsValue(), "One or both products don't exist");
        // get products
        Handshaker predecessor = products[_predecessorProductId];
        Handshaker successor = products[_successorProductId];

        require(msg.sender == predecessor.Get_Owner() || msg.sender == successor.Get_Owner(), "Links can only be removed by either of the owners");
        // remove links from products
        address[] storage arr = predecessor.Ids[relation.SUCCESSOR];
        uint len = arr.length;
        for (uint i = 0; i < len; i++) {
            if (successor.Ids[relation.SUCCESSOR][i] == _predecessorProductId) {
                delete successor.Ids[relation.SUCCESSOR][i];
                break;
            }
        }
        len = successor.Ids[relation.SUCCESSOR].length;
        for (uint i = 0; i < len; i++) {
            if (predecessor.Ids[relation.PREDECESSOR][i] == _successorProductId) {
                delete predecessor.Ids[relation.PREDECESSOR][i];
                break;
            }
        }
    }
*/
    //CONTRACT BECOMES TOO LARGE IF ANOTHER METHOD IS ADDDED 

    // function Change_Name(string calldata name, address productId) public {
    //     Product product = products[productId];
    //     require(msg.sender == product.Get_Owner(), "Sender is not the owner of this product" );
    //      product.Set_Name(name);
    //  }
}
