import React from "react";
import supplyChain from '../contract.js'

const AddLink=()=>{
    return(
        <div>
            <h4>Private ETH Key: <input type="text"></input></h4>
            <h4>Successor Product ID: <input type="text"></input></h4>
            <h4>Predecessor Product ID: <input type="text"></input></h4>
            <button class="button">Add Link</button>
        </div>
    )
}

export default AddLink;