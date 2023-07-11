import React from "react"
import supplyChainLinker from '../supplyChainLinker.js'
import {ethers} from 'ethers'

async function removeLabel() {
    // Retrieve the input values
    var privateKey = document.getElementById("privateKeyInput").value
    var supplyChainID = document.getElementById("supplyChainIDInput").value
    var firstAddress = document.getElementById("firstAddressInput").value
    var firstRelation = parseInt(document.getElementById("firstRelationInput").value, 10)
    var secondAddress = document.getElementById("secondAddressInput").value
    var secondRelation = parseInt(document.getElementById("secondRelationInput").value, 10)

    const INFURA_KEY = "87aba688433f4c81a19c6930944cae93"
    const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)
    const signer = new ethers.Wallet(privateKey, provider)

    // Call the removeLink() function with the retrieved values
    await supplyChainLinker.connect(signer).removeLink(supplyChainID, firstAddress,firstRelation, secondAddress, secondRelation,{gasLimit:5000000})
      .then((result) => {
        // Handle the result if necessary
        console.log("Link removed:", result)
      })
      .catch((error) => {
        // Handle any errors that occur during the function call
        console.error("Error removing link:", error)
      })
  }

const RemoveLink=()=>{
    return(
        <div>
            <h4>Remove Link</h4>
            <h5>Private ETH Key: <input type="text" id="privateKeyInput"></input></h5>
            <h5>Supply Chain ID: <input type="text" id="supplyChainIDInput"></input></h5>
            <h5>First Address: <input type="text" id="firstAddressInput"></input></h5>
            <h5>First Relation: <input type="text" id="firstRelationInput"></input></h5><h6>*[0:None, 1:Predecessor, 2:Successor, 3:Label, 4:Product]</h6>
            <h5>Second Address: <input type="text" id="secondAddressInput"></input></h5>
            <h5>Second Relation: <input type="text" id="secondRelationInput"></input></h5><h6>*[0:None, 1:Predecessor, 2:Successor, 3:Label, 4:Product]</h6>
            <button class="button" onClick={removeLabel}>Remove Link</button>
        </div>
    )
}

export default RemoveLink