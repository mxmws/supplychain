import React from "react";
import supplyChain from '../contract.js'

const CreateLabel=()=>{
    return(
        <div>
            <h4>Private ETH Key: <input type="text"></input></h4>
            <h4>Label Name: <input type="text"></input></h4>
            <h4>Webseit Link: <input type="text"></input></h4>
            <button class="button">Create Label</button>
        </div>
    )
}

export default CreateLabel;