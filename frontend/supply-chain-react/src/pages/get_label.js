import React, {useState} from "react";
import {Link} from "react-router-dom"


const GetLabel = () => { 
  const [labelAddress, setLabelAddress] = useState("");

  const handleInputChange = (event) => {
    setLabelAddress(event.target.value);
  };

  return (
    <div>
      <h5>
        Label ID: <input type="text" id="labelAddressInput" value={labelAddress} onChange={handleInputChange} />
      </h5>
      <Link to={`/label_info/${labelAddress}`}>
        <button>Search</button>
      </Link>
    </div>
  );
};

export default GetLabel;
