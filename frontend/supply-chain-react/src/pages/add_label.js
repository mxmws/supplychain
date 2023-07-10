import React from "react";
import supplyChain from '../contract.js'
import {ethers} from 'ethers'

async function addLabel() {
    // Retrieve the input values
    var privateKey = document.getElementById("privateKeyInput").value
    var labelName = document.getElementById("labelNameInput").value
    //var productIDs = (document.getElementById("productIDsInput").value.split(","))
    var ipfsAddress = (document.getElementById("ipfsAddressInput").value)

    //following vars that received from UI could not be reconozed as array by addProdyct() now, it will be fixed later
    var productIDs = []

    const INFURA_KEY = "87aba688433f4c81a19c6930944cae93"
    const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)
    const signer = new ethers.Wallet(privateKey, provider)

    // Call the addProduct() function with the retrieved values
    await supplyChain.connect(signer).addLabel(labelName, productIDs,ipfsAddress,{gasLimit:5000000})
      .then((result) => {
        // Handle the result if necessary
        console.log("Label added:", result)
      })
      .catch((error) => {
        // Handle any errors that occur during the function call
        console.error("Error adding product:", error)
      });
  }

const AddLabel=()=>{
    return(
        <div>
            <h4>Private ETH Key: <input type="text" id="privateKeyInput"></input></h4>
            <h4>Label Name: <input type="text" id="labelNameInput"></input></h4>
            <h4>Product IDs: <input type="text" id="productIDsInput"></input></h4>
            <h4>IPFS Address: <input type="text" id="ipfsAddressInput"></input></h4>
            <button class="button" onClick={addLabel}>Add Label</button>
        </div>
    )
}

export default AddLabel;