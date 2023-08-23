import React from "react"
import { Web3Storage } from 'web3.storage'

const api_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzZDQ3OWYwMmIyMEZhRDdiMjhDYjNhQzAwZjkzMjAwNjg5ZGJDQTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODkyOTA1MDQzODQsIm5hbWUiOiJNeUZpcnN0QVBJIn0.x-4Il1CvPQcqeK7TX17P5pTeN5ECg0cHP2Cw5ROf4Lo"

function processFile() {
    return new Promise((resolve, reject) => {
      let input = document.createElement('input')
      input.type = 'file'
      input.onchange = () => {
        if (input.files.length > 0) {
          //resolve(input.files[0])
          resolve({ file: input.files[0], fileName: input.files[0].name })
        } else {
          reject(new Error('No file selected.'))
        }
      }
      input.click()
    })
  }
  
  async function uploadFile() {
  
    // Initialize web3.storage client
    const client = new Web3Storage({ token: api_token })
    
    //let file = await processFile()
    let {file, fileName} = await processFile()
  
    // Upload the file to web3.storage
    const cid = await client.put([file])

    let fileLink = cid + "/" + fileName
  
    // Log the CID
    //console.log('File Cid:', cid)
    console.log('File Link:', fileLink)
  
    return fileLink
  }

  export {uploadFile}