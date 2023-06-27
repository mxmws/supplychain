// our contract on the blockchain: https://goerli.etherscan.io/address/0xc2e4fd40b0299c414e083b139ea403e0cfac5676

const INFURA_KEY = ""
const PRIVATE_ETH_KEY = ""

const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)
const signer = new ethers.Wallet(PRIVATE_ETH_KEY, provider);

const abi = 
["function addProduct( uint _id, string memory _name, uint _carbonFootprint, string memory _swarmStorageAddress) public ",
"function getProduct(uint _id) public view returns ( string memory name, uint carbonFootprint, string memory swarmStorageAddress )"]

const supplychain = new ethers.Contract("0xc2e4FD40b0299C414e083B139ea403e0CFaC5676", abi, signer)



const main = async () => {
    const product = await supplychain.getProduct(12345)
  
    console.log(`Name: ${product.name}, Carbon Footprint: ${product.carbonFootprint}, Swarm Address: ${product.swarmStorageAddress} "`)
}

main()
