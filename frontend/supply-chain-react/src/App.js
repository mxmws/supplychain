import React, { Component } from 'react'
import './App.css'
//import { providers, Contract } from "ethers"
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import GetInfo from './pages/home';
import ProductInfo from './pages/product_info'
import AddProduct from './pages/add_product';
import AddLabel from './pages/add_label';
import AddLink from './pages/add_link';
import CreateLabel from './pages/create_label';
import RemoveLabel from './pages/remove_label';
import RemoveLink from './pages/remove_link';


function App(){
  return (
      
    <Router>

      <div className="header">
        <h1><a to="/">Make Supply Chain More Transparent</a></h1>
      </div>

      <div className="container">

        <div className="side-nav">
          <Link to="/" className='link-style'>Search Product</Link>
          <Link to="/add_product" className='link-style'>Add Product</Link>
          <Link to="/add_label" className='link-style'>Add Label</Link>
          <Link to="/add_link" className='link-style'>Add Link</Link>
          <Link to="/create_label" className='link-style'>Create Label</Link>
          <Link to="/remove_label" className='link-style'>Remove Label</Link>
          <Link to="/remove_link" className='link-style'>Remove Link</Link>
        </div>

        <div className="content">
          <Routes>
            <Route exact path="/" Component={GetInfo}></Route>
            <Route path="/add_product" Component={AddProduct}></Route>
            <Route path="/product_info/:productAddress" Component={ProductInfo}></Route>
            <Route path='/add_label' Component={AddLabel}></Route>
            <Route path='/add_link' Component={AddLink}></Route>
            <Route path='/create_label' Component={CreateLabel}></Route>
            <Route path='/remove_label' Component={RemoveLabel}></Route>
            <Route path='/remove_link' Component={RemoveLink}></Route>
          </Routes>
        </div>

      </div> 

    </Router>
    );
}

export default App;
