import React from "react";
import supplyChain from '../contract.js'

const RemoveLabel=()=>{
    return(
        <div>
            <h4>Private ETH Key: <input type="text"></input></h4>
            <h4>Product ID: <input type="text"></input></h4>
            <h4>Label ID: <input type="text"></input></h4>
            <button class="button">Remove Label</button>
        </div>
    )
}

export default RemoveLabel;