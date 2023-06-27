// our contract on the blockchain: https://goerli.etherscan.io/address/0x8ea0396c19887a33ad39736aae0d91ecec2a6aed

const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/87aba688433f4c81a19c6930944cae93`)
const signer = new ethers.Wallet("22c39ee44370b7ac06c9d1a2ca9c728336f4eb2d485cfb16da6246cc6906999a", provider);

const address = '0x16F0C33f7cf51630751f2c30b030a28f4Efab7AF'

const abi = [
    "function sayHelloWorld() public pure returns (string memory)"]

const helloWorldContract = new ethers.Contract("0x8Ea0396C19887A33aD39736AaE0d91eCec2A6AEd", abi, signer)



const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
    
    const name = await helloWorldContract.sayHelloWorld()
  
    console.log(name)
}

main()
