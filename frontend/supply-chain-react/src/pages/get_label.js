import React, {useState} from "react"
import {Link} from "react-router-dom"


const GetLabel = () => { 

  // Define state for labelAddress
  const [labelAddress, setLabelAddress] = useState("")

  // Event handler for input change
  const handleInputChange = (event) => {
      setLabelAddress(event.target.value)
  }

  return (
    <div>
      {/* Input field for label address */}
      <h4>Label Information</h4>
      <h5>
        Label ID: <input type="text" id="labelAddressInput" value={labelAddress} onChange={handleInputChange} />
      </h5>

      {/* Link to label_info page */}
      <Link to={`/label_info/${labelAddress}`}>
        <button>Search</button>
      </Link>
    </div>
  )
}

export default GetLabel
