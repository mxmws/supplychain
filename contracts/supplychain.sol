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
        address[] memory _labelIDs,
        address[] memory _successors,
        address[] memory _predecessors,
        string memory _ipfsAddress
    ) public returns (address) {
        Product prod = new Product(_name, _carbonFootprint, msg.sender);

        for(uint i = 0; i < _labelIDs.length; i++){
            prod.Add_Candidate(_labelIDs[i], relation.LABEL); 
        }

        for(uint i = 0; i < _successors.length; i++){
            prod.Add_Candidate(_successors[i], relation.SUCCESSOR); 
        }

        for(uint i = 0; i < _predecessors.length; i++){
            prod.Add_Candidate(_predecessors[i], relation.PREDECESSOR); 
        }
        prod.Set_IPFS(_ipfsAddress);

        products[address(prod)] = prod;

        return address(prod);
    }
    
    function Get_Product(address _productAddress) public view returns(Product){
        return products[_productAddress];  
    }

    function Get_Label(address _labelAddress) public view returns(Label){
        return labels[_labelAddress];
    }
}
