import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { supply_chain_abi, supply_chain_address } from './config.js'

class App extends Component {
  componentWillMount(){
    this.loadBlockchainData()
  }

  async loadBlockchainData(){

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
    
    const supplyChain = new web3.eth.Contract(supply_chain_abi, supply_chain_address)
    this.setState({supplyChain})
    
    const productCount = await supplyChain.methods.getProductCount().call() 
    this.setState({productCount: productCount})

    console.log("Product Count: " + productCount)

    const products = []
    
    for (var i = 1; i <= productCount; i++) {
      const product = await supplyChain.methods.products(i).call()
      products.push(product)
    }
    this.setState({products})
    console.log(products)
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: []
    }
  }

  createProduct() {
    const name = this.input.value 
    this.state.supplyChain.methods.createProduct(name).send({ from: this.state.account })
  }

  getProductCount(){
    this.state.supplyChain.methods.getProductCount().call()
  }

  render() {
    return (
      <div>
        
        <h1 className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank">Make Supply Chain More Transparent</h1>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              <div id="loader" className="text-center">
                <p className="text-center">Add a Product Name: </p>
              </div>
              <div id="content">
                <form>
                  <input id="newProduct" type="text" 
                    ref={input=> this.input = input}
                  ></input>
                  <button type="submit" onClick={this.createProduct.bind(this)}>{"Submit"}</button>
                </form>
                <ul id="productList" className="list-unstyled">
                  <div className="productTemplate">
                    <label>
                      <span>{"Product Count: " + this.state.productCount}</span>
                    </label>
                  </div>
                </ul>
              </div>
            </main>
          </div>
        </div>
      </div>
    );

  }

}

export default App;
