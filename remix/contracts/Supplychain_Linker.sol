// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Product.sol";
import "./Label.sol";
import "./supplychain.sol";

contract Supplychain_Linker {

    event ContractsLinked(address firstContract,
                          address secondContract);

    event LinkRemoved(address firstContract,
                        address SecondContract);

    address SupplychainId;
    constructor(address _supplychainId){
        SupplychainId = _supplychainId;
    }
    function GetHandshakers(address firstAddress, relation r1, address secondAddress, relation r2) private view returns(Handshaker, Handshaker){
        
        require(r1 != relation.NONE && r2 != relation.NONE, "relations should not be NONE");
        
        Supplychain sc = Supplychain(SupplychainId);
        
        Handshaker firstContract;
        Handshaker secondContract;

        if(r1 == relation.LABEL )
            firstContract = sc.Get_Handshaker(firstAddress, relation.LABEL);
        else
            firstContract = sc.Get_Handshaker(firstAddress, relation.PRODUCT);
        
        if(r2 == relation.LABEL)
            secondContract = sc.Get_Handshaker(secondAddress, relation.LABEL);
        else
            secondContract = sc.Get_Handshaker(secondAddress, relation.PRODUCT);

        return (firstContract, secondContract);
    }

    function addLink(address firstAddress, relation r1, address secondAddress, relation r2) public returns(bool handshake_complete)  {
                    //label                   product//label             LABEL       prooduct                PRODUCT
        (Handshaker firstContract, Handshaker secondContract) = GetHandshakers(firstAddress, r1, secondAddress, r2);
        if(msg.sender == firstContract.Get_Owner())
        {                  //label                          //product          LABEL
            bool success = firstContract.Do_Handshake(address(secondContract), r2);            
                        
            if(firstContract.Get_Owner() != secondContract.Get_Owner()){
                emit ContractsLinked(firstAddress, secondAddress);
                return success;
            }
        }

        if(msg.sender == secondContract.Get_Owner())
        {
            bool success =  secondContract.Do_Handshake(address(firstContract), r1);
            
            return success;
        }
        else{
            //throw 
            require(false, "Message sender is not the owner of either product");
        }
    }

    function removeLink(address firstAddress, relation r1, address secondAddress, relation r2) public {    
        
        (Handshaker firstContract, Handshaker secondContract) = GetHandshakers(firstAddress, r1, secondAddress, r2);
        
        require(msg.sender == firstContract.Get_Owner() || msg.sender == secondContract.Get_Owner(), "Links can only be removed by either of the owners");
        
        // remove links from products
        address[] memory arr = firstContract.Get_Ids(r2);
        uint len = arr.length;
        for (uint i = 0; i < len; i++) {
            if (arr[i] == address(secondContract)) {
                firstContract.Delete_Id(r2, i);
                break;
            }
        }
        arr = secondContract.Get_Ids(r1);
        len = arr.length;
        for (uint i = 0; i < len; i++) {
            if (arr[i] == address(firstContract)) {                
                secondContract.Delete_Id(r1, i);
                break;
            }
        }

        emit LinkRemoved(firstAddress, secondAddress);
    }
}