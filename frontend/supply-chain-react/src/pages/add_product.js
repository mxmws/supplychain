import React, {Suspense, useState} from "react"
import supplyChain from '../supplyChain.js'
import {ethers} from 'ethers'
import { uploadFile } from "../uploadFile.js"
  

const AddProduct=()=>{

  let [imageCid, setImageCid] = useState("")
  let [pdfCid, setPdfCid] = useState("")
  const [isPDFUploading, setIsPDFUploading] = useState(false)
  const [isImageUploading, setIsImageUploading] = useState(false)

  
  const handlePDFUpload =async() =>{
    setIsPDFUploading(false)
    setIsPDFUploading(true)
    pdfCid = await uploadFile()
    setPdfCid(pdfCid)
  }

  const handleIMGUpload =async() =>{
    setIsImageUploading(false)
    setIsImageUploading(true)
    imageCid = await uploadFile()
    setImageCid(imageCid)
  }


  async function addProduct() {


    // Retrieve the input values
    var privateKey = document.getElementById("privateKeyInput").value
    var name = document.getElementById("nameInput").value
    var carbonFootprint = parseInt(document.getElementById("carbonFootprintInput").value, 10)
    var labels = (document.getElementById("labelsInput").value.split(","))
    if(labels==""){labels = []}
    var successors = (document.getElementById("successorsInput").value.split(","))
    if(successors==""){successors = []}
    var predecessors = (document.getElementById("predecessorsInput").value.split(","))
    if(predecessors==""){predecessors = []}

    try{  

      const INFURA_KEY = "87aba688433f4c81a19c6930944cae93"
      const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)
      const signer = new ethers.Wallet(privateKey, provider)

      // Call the addProduct() function with the retrieved values
      var contract = await supplyChain.connect(signer)

      const tx = await contract.addProduct(name, carbonFootprint, labels, successors, predecessors, pdfCid, imageCid, {gasLimit:5000000})

      const rc = await tx.wait()

      const event = rc.events.find(event => event.event === 'ProductAdded')

      // Return Product ID 
      console.log(event.args[2])
      return event.args[2]
    
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

  const [message, setMessage] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const performAddProduct = async() => {

    setIsAdding(true)

    try {
      const productID = await addProduct()
      setMessage(productID)
    } catch (error) {
      setMessage(error)
    } finally {
      setIsAdding(false)
    }
  }


  return(
    <div>
      <h4>Add Product</h4>
      <h5>ETH Private Key: <input type="text" id="privateKeyInput"></input></h5>
      <h5>Product Name: <input type="text" id="nameInput"></input></h5>
      <h5>Carbon Footprint: <input type="text" id="carbonFootprintInput"></input></h5>
      <h5>Labels: <input type="text" id="labelsInput"></input></h5>
      <h5>Successors: <input type="text" id="successorsInput"></input></h5>
      <h5>Predecessors: <input type="text" id="predecessorsInput"></input></h5>
      <h5>Upload PDF: <button className="button" id="pdfUpload" onClick={handlePDFUpload}>Upload</button></h5><h6>{isPDFUploading ? (pdfCid ? (<p>upload successfully</p>):(<p>uploading</p>)):null}</h6>
      <h5>Upload Image: <button className="button" id="imgUpload" onClick={handleIMGUpload}>Upload</button></h5><h6>{isImageUploading ? (imageCid ? (<p>upload successfully</p>):(<p>uploading</p>)):null}</h6>
      <h5> 
        {isAdding ? (<p>Product adding...</p>) : (
          <div>
            {message ? (
              <p>Added Product ID: {message}</p>
            ) : null}
          </div>
          )}</h5>
            
      <button className="button" onClick={performAddProduct}>Add Product</button>
            
    </div>
  )
}

export default AddProduct