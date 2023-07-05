// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Product.sol";

contract Label is Ownable{
    struct Instance {
        bool isValue;
        string name;
        uint productId;
    }

    Instance public instance;

    constructor(string memory name, uint productId) Ownable(){
        instance = Instance(true, name, productId);
    }

    function IsValue() public view returns(bool){
        return instance.isValue;
    }

    function Name() public view returns(string memory){
        return instance.name;
    }

    function ProdcutId() public view returns(uint){
        return instance.productId;
    }
}