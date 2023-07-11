import{contract_address_1, contract_abi_1, contract_address_2, contract_abi_2} from "./config"

const { ethers } = require("ethers");

const INFURA_KEY = "87aba688433f4c81a19c6930944cae93"

const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)
    
const supplyChain = new ethers.Contract(contract_address_1, contract_abi_1, provider)

const supplyChainLinker = new ethers.Contract(contract_address_2, contract_abi_2, provider)
  
 
export default supplyChainLinker