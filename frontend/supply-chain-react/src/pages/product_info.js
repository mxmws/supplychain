import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supplyChain from "../contract"; // Import your supplyChain contract

const ProductInfo = () => {
  const { productAddress } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Call the getProduct function of your supplyChain contract
        const product = await supplyChain.getProduct(productAddress)
        console.log(product)
        setProduct(product)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProduct()
  }, [productAddress])

  return (
    <div>
      <h2>Product Info</h2>
      {product ? (
        <div>
          <h4>Product Name: {product.name}</h4>
          <h4>Carbon Footprint: {product.carbonFootprint.toString()}</h4>
          <h4>Labels: {product.labels}</h4>
          <h4>Predecessors: {product.predecessors}</h4>
          <h4>Successors: {product.successors}</h4>
          <h4>Download Files: <button><a href={product.swarmStorageAddress}>Download</a></button></h4>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductInfo;