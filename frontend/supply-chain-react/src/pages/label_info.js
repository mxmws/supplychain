import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import supplyChain from "../contract" // Import supplyChain contract

const LabelInfo = () => {
  const { labelAddress } = useParams()
  const [label, setLabel] = useState(null)

  useEffect(() => {
    const fetchLabel = async () => {
      try {
        // Call the getLabel function of supplyChain contract
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
      {label ? (
        <div>
          <h4>Label Information</h4>
          <h5>Label Name: {label._name}</h5>
          <h5>Labeled Product IDs: {label._labels}</h5>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default LabelInfo;