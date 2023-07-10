import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supplyChain from "../contract"; // Import your supplyChain contract

const LabelInfo = () => {
  const { labelAddress } = useParams()
  const [label, setLabel] = useState(null)

  useEffect(() => {
    const fetchLabel = async () => {
      try {
        // Call the getLabel function of your supplyChain contract
        const label = await supplyChain.getLabel(labelAddress)
        console.log(label)
        setLabel(label)
      } catch (error) {
        console.error(error)
      }
    }

    fetchLabel()
  }, [labelAddress])

  return (
    <div>
      <h2>Label Info</h2>
      {label ? (
        <div>
          <h4>Label Name: {label._name}</h4>
          <h4>Labeled Product IDs: {label._labels}</h4>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LabelInfo;