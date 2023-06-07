// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

// maybe this will be useful in the future idk
contract Ownable {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, 'caller must be owner');
        _;
    }
}


contract Supplychain is Ownable {

    struct product {
        bool isValue;
        string name;
        uint[] successorIds; // maybe use mappings instead. Disadvantage of mappings is that we can't get keys or values without knowing the keys
        uint[] predecessorIds;
        uint carbonFootprint;
    }

    struct label {
        bool isValue;
        string name;
        uint productId;
    }

    mapping (uint => product) products;
    mapping (uint => label) labels;

    event ProductAdded(
        address indexed _user,
        uint _id,
        string _name
    );

    event LabelAdded(
        address indexed _user,
        uint _id,
        string _name
    );

    event LinkAdded(
        address indexed _user,
        uint _predecessorProductId,
        uint _successorProductId
    );

    event LinkRemoved(
        address indexed _user,
        uint _predecessorProductId,
        uint _successorProductId
    );
    
    function addLabel(uint _id, string memory _name, uint _productId) public {
        require(!labels[_id].isValue, "Label with this ID already exists");
        labels[_id] = label(true, _name, _productId);
        // ToDo: Handshake
        emit LabelAdded(msg.sender, _id, _name);
    }

    function addProduct(uint _id, string memory _name, uint[] memory _successors, uint[] memory _predecessors, uint _carbonFootprint) public {
        require(!products[_id].isValue, "Product with this ID already exists");
        products[_id] = product(true, _name, _successors, _predecessors, _carbonFootprint);
        // ToDo: Handshake
        emit ProductAdded(msg.sender, _id, _name); // event will be on the blockchain forever
    }

    function addLink(uint _predecessorProductId, uint _successorProductId) public {
        // ToDo: Handshake / checking ownership
        // ToDo: make sure link doesn't exist yet

        // check if both products exist
        require(products[_predecessorProductId].isValue && products[_successorProductId].isValue, "One or both products don't exist");

        // get products // ToDo: probably shouldn't be storage
        product storage predecessorProduct = products[_predecessorProductId];
        product storage successorProduct = products[_successorProductId];

        // add links to products
        predecessorProduct.successorIds.push(_successorProductId);
        successorProduct.predecessorIds.push(_predecessorProductId);

        // update products on chain
        products[_predecessorProductId] = predecessorProduct;
        products[_successorProductId] = successorProduct;

        emit LinkAdded(msg.sender, _predecessorProductId, _successorProductId);
    }

    function removeLink(uint _predecessorProductId, uint _successorProductId) public {
        // Todo: Problem: searching an array can be very expensive
        // check if both products exist
        require(products[_predecessorProductId].isValue && products[_successorProductId].isValue, "One or both products don't exist");

        // get products
        product storage predecessorProduct = products[_predecessorProductId];
        product storage successorProduct = products[_successorProductId];

        // remove links from products
        uint predecessorIndex;
        uint successorIndex;

        // find index of _successorProductId in predecessor's successors
        for (uint i = 0; i < predecessorProduct.successorIds.length; i++) {
            if (predecessorProduct.successorIds[i] == _successorProductId) {
                predecessorIndex = i;
                break;
            }
        }

        // find index of _predecessorProductId in successor's predecessors
        for (uint i = 0; i < successorProduct.predecessorIds.length; i++) {
            if (successorProduct.predecessorIds[i] == _predecessorProductId) {
                successorIndex = i;
                break;
            }
        }

        // remove the links
        delete predecessorProduct.successorIds[predecessorIndex];
        delete successorProduct.predecessorIds[successorIndex];

        // update products on chain
        products[_predecessorProductId] = predecessorProduct;
        products[_successorProductId] = successorProduct;

        emit LinkRemoved(msg.sender, _predecessorProductId, _successorProductId);
}

}
