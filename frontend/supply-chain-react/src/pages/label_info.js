import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import supplyChain from "../supplyChain" // Import supplyChain contract
import {Link} from "react-router-dom"

const LabelInfo = () => {
  const { labelAddress } = useParams()
  const [label, setLabel] = useState(null)

  useEffect(() => {
    const fetchLabel = async () => {
      try {
        // Call the getLabel function of supplyChain contract
        const label = await supplyChain.getLabel(labelAddress)
        console.log(label)
        setLabel(label)
      } catch (error) {
        if (error.message.includes("resolver or addr is not configured for ENS name")) {
          // Display "invalid ID" error in a popup window
          window.alert("Invalid ID or Address")
        } else {
          // Handle other errors
          console.error(error)
        }
      }
    }

    fetchLabel()
  }, [labelAddress])


  const getProducts = async() => {
    const _productNames = []
    const products = label._labels
    for(let i=0; i<products.length; i++){
      const product = await supplyChain.getProduct(products[i])
      _productNames[i] = product._name
    }

    return _productNames
  }


  const [productNames, setProductNames] = useState([])
  
  useEffect(() => {
    if (label) {
      getProducts().then((result) => {
        setProductNames(result)
      })
    }
  }, [label])
  

  const productList = productNames.map((productName, index) => (
    <Link to={`/product_info/${label._labels[index]}`} key={index}>
        {productName + " ; "}
    </Link>
  ))

  return (
    <div>
      {label ? (
        <div>
          <h4>Label Information</h4>
          <h5>Label Name: {label._name}</h5>
          <h5>Label Address: {labelAddress}</h5>
          <h5>Labeled Products: {productList}</h5>
          <h5>Download PDF: <a href={`https://w3s.link/ipfs/${label._ipfsAddress}`} target="_blank">Download</a></h5>
          <h5>Download Image: <a href={`https://w3s.link/ipfs/${label._iamgeCid}`} target="_blank">Download</a></h5>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default LabelInfo;