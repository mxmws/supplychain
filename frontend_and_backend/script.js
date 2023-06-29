// our contract on the blockchain: https://goerli.etherscan.io/address/0xaff1fd4e1e3c8991f96a8f0c76840fbf992cc581#events


const INFURA_KEY = ""
const PRIVATE_ETH_KEY = ""

const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)
//const signer = new ethers.Wallet(PRIVATE_ETH_KEY, provider);

const abi = 
["function getProduct(address _id) public view returns ( string memory name, uint carbonFootprint, string memory swarmStorageAddress, address[] memory labels, address[] memory predecessors, address[] memory successors )",
"function addProduct( string memory _name, uint _carbonFootprint, address[] memory _labelIDs, address[] memory _successors, address[] memory _predecessors, string memory _ipfsAddress ) public returns (address)"]

car_address = "0x4fA0dE8FCC63d3A9be4576e258169ebdEc6F7a3B"
tire_address = "0xe2475134E488d8295CA290C3646C452294797af9"

const supplychain = new ethers.Contract("0xaff1FD4e1E3c8991f96A8f0c76840fBf992Cc581", abi, provider)



const main = async () => {
    const car = await supplychain.getProduct(car_address)
    const tire = await supplychain.getProduct(tire_address)

    console.log(car.name)
    console.log(tire.name)
}

main()
