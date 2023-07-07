//SPDX-License-Identifier: MIT
//pragma solidity ^0.8.18;
pragma solidity >=0.4.22 <0.9.0;

contract SupplyChain {
  uint productCount = 0;

  struct Product {
    uint id;
    string name;
  }

  constructor() public {
    createProduct("VW Auto");
  }

  mapping(uint => Product) public products;

   event ProductCreated(
    uint id,
    string name
  );

  function getProductCount() public view returns(uint){
    return productCount;
  }

  function createProduct(string memory _name) public{
    products[productCount] = Product(productCount, _name);
    productCount++;
  }

}