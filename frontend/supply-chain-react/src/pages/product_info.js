import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import supplyChain from "../contract" // Import supplyChain contract
import {Link} from "react-router-dom"

const ProductInfo = () => {

  // Get the productAddress from the URL paramete
  const { productAddress } = useParams()

  // Define state for product
  const [product, setProduct] = useState(null)

  const fetchProduct = async () => {
    try {
      // Call the getProduct function of supplyChain contract
      const product = await supplyChain.getProduct(productAddress)

      // Output the product data to the console (for testing purposes)
      console.log(product)

      // Set the product state with the retrieved product data
      setProduct(product)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // Fetch product data when the component mounts or the productAddress changes
    
    

    fetchProduct()
  }, [productAddress])

  return (
    <div>
      {product ? (
        <div>
          {/* Display product information */}
          <h4>Product Information</h4>
          <h5>Product Name: {product._name}</h5>
          <h5>Carbon Footprint: {product.carbonFootprint.toString()}</h5>
          <h5>Labels: {product._labels}</h5>
          <h5>Predecessors: {product.predecessors}</h5>
          <h5>Successors: {product.successors}</h5>
          <h5>Download Files: <button><a href={product.swarmStorageAddress}>Download</a></button></h5>
          <Link to={`/graph/${productAddress}`}>
            <button>Show Graph</button>
          </Link>
          </div>
      ) : (
        // Display a loading message while product data is being fetched
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProductInfo