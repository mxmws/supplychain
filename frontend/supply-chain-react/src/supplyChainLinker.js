import{contract_address_supplychain, contract_abi_supplychain, contract_address_linker, contract_abi_linker} from "./config"

const { ethers } = require("ethers");

const INFURA_KEY = "87aba688433f4c81a19c6930944cae93"

const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)
    
const supplyChain = new ethers.Contract(contract_address_supplychain, contract_abi_supplychain, provider)

const supplyChainLinker = new ethers.Contract(contract_address_linker, contract_abi_linker, provider)
  
 
export default supplyChainLinker