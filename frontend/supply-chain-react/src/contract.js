import React from "react";
//import { providers, Contract } from "ethers"

const { ethers } = require("ethers");

const INFURA_KEY = "87aba688433f4c81a19c6930944cae93"

const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)

const abi = 
  ["function getProduct(address _id) public view returns ( string memory name, uint carbonFootprint, string memory swarmStorageAddress, address[] memory labels, address[] memory predecessors, address[] memory successors )",
  "function addProduct( string memory _name, uint _carbonFootprint, address[] memory _labelIDs, address[] memory _successors, address[] memory _predecessors, string memory _ipfsAddress ) public returns (address)"]

    
const supplyChain = new ethers.Contract("0xaff1FD4e1E3c8991f96A8f0c76840fBf992Cc581", abi, provider)
  
/*
const car_address = "0x4fA0dE8FCC63d3A9be4576e258169ebdEc6F7a3B"
const tire_address = "0xe2475134E488d8295CA290C3646C452294797af9"
*/
 
export default supplyChain