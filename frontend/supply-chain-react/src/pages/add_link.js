import React from "react"
import supplyChainLinker from '../supplyChainLinker.js'
import {ethers} from 'ethers'

async function addLink() {

  try{
    // Retrieve the input values
    var privateKey = document.getElementById("privateKeyInput").value
    var firstAddress = document.getElementById("firstAddressInput").value
    var firstRelation = parseInt(document.getElementById("firstRelationInput").value, 10)
    var secondAddress = document.getElementById("secondAddressInput").value
    var secondRelation = parseInt(document.getElementById("secondRelationInput").value, 10)

    if((firstRelation+secondRelation == 3)||(firstRelation+secondRelation == 7)){

      console.log("first relation:" + firstRelation)
      console.log("second realtion:" + secondRelation)

      const INFURA_KEY = "87aba688433f4c81a19c6930944cae93"
      const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)
      const signer = new ethers.Wallet(privateKey, provider)

      // Call the addLink() function with the retrieved values
      await supplyChainLinker.connect(signer).addLink(firstAddress,firstRelation, secondAddress, secondRelation,{gasLimit:5000000})
        .then((result) => {
         // Handle the result if necessary
          console.log("Link added:", result)
        })
        .catch((error) => {
          // Handle any errors that occur during the function call
          window.alert("Error adding link: " + error.message)
        })

    } else {
      window.alert("Invailed Relation")
    }

  } catch (error) {
        // Handle any errors that occur during the function call
        if (error.message.includes("invalid hexlify value")){
          window.alert("Please input valid private key")
        }else if (error.message.includes("invalid value for array")) {
          // Display "invalid ID" error in a popup window
          window.alert("Please input valid informations")
          console.log(error)
          //throw new Error("Please input valid informations")
        }else if (error.message.includes("insufficient funds")){
          window.alert("Insufficient Funds")
        } else if (error.message.includes("BigNumber")){
          window.alert("Please input valid number")
        }
        else {
          window.alert(error.message)
        }    
  }
}

const AddLink=()=>{
    return(
        <div>
            <h4>Add Link</h4>
            <h5>Private ETH Key: <input type="text" id="privateKeyInput"></input></h5>
            <h5>First Address: <input type="text" id="firstAddressInput"></input></h5>
            <h5>First Relation: 
            <select id="firstRelationInput">
              <option value="0">None</option>
              <option value="1">Predecessor</option>
              <option value="2">Successor</option>
              <option value="3">Label</option>
              <option value="4">Product</option>
            </select>
            </h5>
            <h5>Second Address: <input type="text" id="secondAddressInput"></input></h5>
            <h5>Second Relation:
            <select id="secondRelationInput">
              <option value="0">None</option>
              <option value="1">Predecessor</option>
              <option value="2">Successor</option>
              <option value="3">Label</option>
              <option value="4">Product</option>
            </select>
            </h5>
            <button className="button" onClick={addLink}>Add Link</button>
        </div>
    )
}

export default AddLink