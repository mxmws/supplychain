import React, {useState} from "react"
import {Link} from "react-router-dom"


const GetInfo = () => { 

  // Define state for productAddress
  const [productAddress, setProductAddress] = useState("")

  // Event handler for input change
  const handleInputChange = (event) => {
    setProductAddress(event.target.value)
  }

  return (
    <div>

      {/* Input field for product address */}
      <h4>Serach information about your product</h4>
      <h5>
        Product ID: <input type="text" id="input_product_address" value={productAddress} onChange={handleInputChange} />
      </h5>

      {/* Link to product_info page */}
      <Link to={`/product_info/${productAddress}`}>
        <button>Search</button>
      </Link>

    </div>
  )
}

export default GetInfo
