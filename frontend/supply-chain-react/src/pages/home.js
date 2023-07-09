import React, {useState} from "react";

//const supplyChain = require('../contract.js')
import supplyChain from '../contract.js'
import ProductInfo from "./product_info.js";
import {Link} from "react-router-dom"


const GetInfo = () => {
  const [productAddress, setProductAddress] = useState("");

  const handleInputChange = (event) => {
    setProductAddress(event.target.value);
  };

  return (
    <div>
      <h5>
        Product ID: <input type="text" id="input_product_address" value={productAddress} onChange={handleInputChange} />
      </h5>
      <Link to={`/product_info/${productAddress}`}>
        <button>Search</button>
      </Link>
    </div>
  );
};

export default GetInfo;
