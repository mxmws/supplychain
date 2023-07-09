import React from "react";
import supplyChain from '../contract.js'

const AddProduct=()=>{
    return(
        <div>
            <h4>Private ETH Key: <input type="text"></input></h4>
            <h4>Product Name: <input type="text"></input></h4>
            <h4>Carbon Footprint: <input type="text"></input></h4>
            <h4>Upload PDF <button>Upload</button></h4>
            <button class="button">Add Product</button>
        </div>
    )
}

export default AddProduct