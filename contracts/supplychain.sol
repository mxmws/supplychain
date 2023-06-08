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
        
        mapping (uint => bool) successorIdIsHandshakeCandidate;
        mapping (uint => bool) predecessorIdIsHandshakeCandidate;

        mapping (uint => uint) successorIdToArrayIndex;
        mapping (uint => uint) predecessorIdToArrayIndex;

        uint[] successorIds; 
        uint[] predecessorIds;

        uint[] labelIds;

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


    // this function shouldn't cost gas (not sure why it says infinite)
    function getProduct(uint _id) public view returns
    (string memory name, uint[] memory successorIds, uint[] memory predecessorIds, 
    uint[] memory labelIds, uint carbonFootprint){
        require(labels[_id].isValue, "Product doesn't exist");
        product storage myProduct = products[_id];
        return (myProduct.name, myProduct.successorIds, myProduct.predecessorIds, 
        myProduct.labelIds, myProduct.carbonFootprint);
    }
    
    function addLabel(uint _id, string memory _name, uint _productId) public {
        require(!labels[_id].isValue, "Label with this ID already exists");
        labels[_id] = label(true, _name, _productId);
        // ToDo: Handshake
        emit LabelAdded(msg.sender, _id, _name);
    }

    function addProduct(uint _id, string memory _name, uint[] memory _successors, uint[] memory _predecessors, uint _carbonFootprint) public {
        require(!products[_id].isValue, "Product with this ID already exists");

        // this is probably not the best way to do it but can't use constructor because struct contains mappings
        products[_id].isValue = true;
        products[_id].name = _name;
        products[_id].successorIds = _successors;
        products[_id].predecessorIds = _predecessors;
        products[_id].carbonFootprint = _carbonFootprint;

        // ToDo: Handshake
        emit ProductAdded(msg.sender, _id, _name); // event will be on the blockchain forever
    }

    function addLink(uint _predecessorProductId, uint _successorProductId) public {
        // ToDo: Handshake / checking ownership
        // ToDo: make sure link doesn't exist yet

        // check if both products exist
        require(products[_predecessorProductId].isValue && products[_successorProductId].isValue, "One or both products don't exist");

        // add links to products
        products[_predecessorProductId].successorIds.push(_successorProductId);
        products[_successorProductId].predecessorIds.push(_predecessorProductId);

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
        delete products[_predecessorProductId].successorIds[predecessorIndex];
        delete products[_successorProductId].predecessorIds[successorIndex];

        emit LinkRemoved(msg.sender, _predecessorProductId, _successorProductId);
    }

}
