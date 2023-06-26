// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Product.sol";

contract Label is Ownable{
    struct Data {
        bool isValue;
        string name;
        uint productId;
    }

    Data public data;

    constructor(string memory name, uint productId) Ownable(){
        data = Data(true, name, productId);
    }

    function IsValue() public view returns(bool){
        return data.isValue;
    }

    function Name() public view returns(string memory){
        return data.name;
    }

    function ProdcutId() public view returns(uint){
        return data.productId;
    }
}