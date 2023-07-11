import React from "react"
import supplyChain from '../contract.js'
import {ethers} from 'ethers'

async function addProduct() {
    // Retrieve the input values
    var privateKey = document.getElementById("privateKeyInput").value
    var name = document.getElementById("nameInput").value
    var carbonFootprint = parseInt(document.getElementById("carbonFootprintInput").value, 10)
    //var labels = (document.getElementById("labelsInput").value.split(","))
    //var successors = (document.getElementById("successorsInput").value.split(","))
    //var predecessors = (document.getElementById("predecessorsInput").value.split(","))
    var ipfsAddress = (document.getElementById("ipfsAddressInput").value)

    //following vars that received from UI could not be reconozed as array by addProdyct() now, it will be fixed later
    var labels = []
    var successors = []
    var predecessors = []

    const INFURA_KEY = "87aba688433f4c81a19c6930944cae93"
    const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)
    const signer = new ethers.Wallet(privateKey, provider)

    // Call the addProduct() function with the retrieved values
    await supplyChain.connect(signer).addProduct(name, carbonFootprint, labels, successors, predecessors, ipfsAddress,{gasLimit:5000000})
      .then((result) => {
        // Handle the result if necessary
        console.log("Product added:", result)
      })
      .catch((error) => {
        // Handle any errors that occur during the function call
        console.error("Error adding product:", error)
      })
  }
  

const AddProduct=()=>{
    return(
        <div>
            <h4>Add Label</h4>
            <h5>ETH Private Key: <input type="text" id="privateKeyInput"></input></h5>
            <h5>Product Name: <input type="text" id="nameInput"></input></h5>
            <h5>Carbon Footprint: <input type="text" id="carbonFootprintInput"></input></h5>
            <h5>Labels: <input type="text" id="labelsInput"></input></h5>
            <h5>Successors: <input type="text" id="successorsInput"></input></h5>
            <h5>Predecessors: <input type="text" id="predecessorsInput"></input></h5>
            <h5>Upload PDF: <input type="text" id="ipfsAddressInput"></input></h5>
            <button class="button" onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct