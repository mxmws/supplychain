import React, {useState} from "react"
import supplyChain from '../supplyChain.js'
import {ethers} from 'ethers'
import {uploadFile} from "../uploadFile.js"


const AddLabel=()=>{

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

  async function addLabel() {

    try{
      // Retrieve the input values
      var privateKey = document.getElementById("privateKeyInput").value
      var labelName = document.getElementById("labelNameInput").value
      var productIDs = (document.getElementById("productIDsInput").value.split(","))
      if(productIDs==""){productIDs = []}


      const INFURA_KEY = "87aba688433f4c81a19c6930944cae93"
      const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_KEY)
      const signer = new ethers.Wallet(privateKey, provider)

      // Call the addLabel() function with the retrieved values
      var contract = await supplyChain.connect(signer)
      const tx = await contract.addLabel(labelName, productIDs, pdfCid, imageCid, {gasLimit:5000000})

      const receipt = await tx.wait()

      const event = receipt.events.find(event => event.event === 'LabelAdded')
      
      console.log(event.args[2])
      window.location.replace(`/label_info/${event.args[2]}`);
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

    const performAddLabel = async() => {

      setIsAdding(true)

      try {
        const labelID = await addLabel()
        setMessage(labelID)
      } catch (error) {
        setMessage(error)
      } finally {
        setIsAdding(false)
      }
    }

    return(
        <div>
            <h4>Add Label</h4>
            <h5>Private ETH Key: <input type="text" id="privateKeyInput"></input></h5>
            <h5>Label Name: <input type="text" id="labelNameInput"></input></h5>
            <h5>Product IDs: <input type="text" id="productIDsInput"></input></h5>
            <h5>Upload PDF: <button className="button" id="pdfUpload" onClick={handlePDFUpload}>Upload</button></h5><h6>{isPDFUploading ? (pdfCid ? (<p>upload successfully</p>):(<p>uploading</p>)):null}</h6>
            <h5>Upload Image: <button className="button" id="imgUpload" onClick={handleIMGUpload}>Upload</button></h5><h6>{isImageUploading ? (imageCid ? (<p>upload successfully</p>):(<p>uploading</p>)):null}</h6>
            <h5>
            {isAdding ? (
                <p>Label adding...</p>
              ) : (
                <div>
                  {message ? (
                    <p>Added Label ID: {message}</p>
                  ) : null}
                </div>
            )}</h5>

            <button className="button" onClick={performAddLabel}>Add Label</button>
        </div>
    )
}

export default AddLabel