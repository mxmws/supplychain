// Import necessary liberies and dependies 
import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

// Import Components for Routes
import GetInfo from './pages/home';
import ProductInfo from './pages/product_info'
import AddProduct from './pages/add_product';
import AddLabel from './pages/add_label';
import AddLink from './pages/add_link';
import GetLabel from './pages/get_label';
import LabelInfo from './pages/label_info';
import RemoveLink from './pages/remove_link';
import Graph from './pages/graph';

// Main App component
function App(){
  return (
      
    <Router>

      {/* Header of website */}
      <div className="header">
        <h1><a to="/">Make Supply Chain More Transparent</a></h1>
      </div>

      {/* Main container */}
      <div className="container">

        {/* Side navigation */}
        <div className="side-nav">
          {/* Link to pages */}
          <Link to="/" className='link-style'>Search Product</Link>
          <Link to="/add_product" className='link-style'>Add Product</Link>
          <Link to="/add_label" className='link-style'>Add Label</Link>
          <Link to="/get_label" className='link-style'>Get Label</Link>
          <Link to="/add_link" className='link-style'>Add Link</Link>
          <Link to="/remove_link" className='link-style'>Remove Link</Link>
        </div>

        {/* Content depends on url*/}
        <div className="content">
          <Routes>
            <Route exact path="/" Component={GetInfo}></Route>
            <Route path="/add_product" Component={AddProduct}></Route>
            <Route path="/product_info/:productAddress" Component={ProductInfo}></Route>
            <Route path='/add_label' Component={AddLabel}></Route>
            <Route path='/add_link' Component={AddLink}></Route>
            <Route path='/get_label' Component={GetLabel}></Route>
            <Route path='/label_info/:labelAddress' Component={LabelInfo}></Route>
            <Route path='/remove_link' Component={RemoveLink}></Route>
            <Route path='/graph/:productAddress' Component={Graph}></Route>
          </Routes>
        </div>

      </div> 

    </Router>
    );
}

export default App;

