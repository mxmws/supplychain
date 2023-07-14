import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import supplyChain from "../contract" // Import supplyChain contract
import {Link} from "react-router-dom"

const ProductInfo = () => {

  
  // Get the productAddress from the URL paramete
  const { productAddress } = useParams()

  // Define state for product
  const [product, setProduct] = useState(null)
  const [carbonFootprint, setCarbonFootprint] = useState("processing...");

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
  const getCO2 = async () => {
    try {
        const existingNodes = [];
        const address_pairs = [];
        const product = await supplyChain.getProduct(productAddress);

        existingNodes.push({
            name: product._name,
            id: productAddress,
            CO2: product.carbonFootprint || 0,
        });

        address_pairs.push({ address: productAddress, successors: product.predecessors });

        await fetchPredecessors(existingNodes, address_pairs);
        let sumCO2 = 0;

        for (let i = 0; i < existingNodes.length; i++) {
            const item = existingNodes[i];
            const CO2Value = parseInt(item.CO2._hex);
            sumCO2 += CO2Value;
            console.log(parseInt(item.CO2._hex))
        }
        setCarbonFootprint(sumCO2)
        return sumCO2;
    } catch (error) {
        console.error(error);
        // alert(error)
    }
};

const fetchPredecessors = async (existingNodes, address_pairs) => {
    const predecessors = address_pairs.flatMap(pair => pair.successors);
    const uniquePredecessors = [...new Set(predecessors)];

    for (const predecessor of uniquePredecessors) {
        if (predecessor === "0x0000000000000000000000000000000000000000") {
            continue;
        }

        const predecessorProduct = await supplyChain.getProduct(predecessor);
        existingNodes.push({
            source: address_pairs[0].address,
            id: predecessor,
            name: predecessorProduct._name,
            CO2: predecessorProduct.carbonFootprint || 0,
        });

        const predecessorAddressPairs = {
            address: predecessor,
            successors: predecessorProduct.predecessors,
        };

        await fetchPredecessors(existingNodes, [predecessorAddressPairs]);
    }
};

  useEffect(() => {
    // Fetch product data when the component mounts or the productAddress changes
    
    

    fetchProduct()
    getCO2()
  }, [productAddress])

  return (
    <div>
      {product ? (
        <div>
          {/* Display product information */}
          <h4>Product Information</h4>
          <h5>Product Name: {product._name}</h5>
          <h5>Product Address: {productAddress}</h5>
          <h5>Combined Carbon Footprint: {carbonFootprint.toString()}</h5>
          <h5>Labels: {product._labels}</h5>
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