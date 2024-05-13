import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login/Login';
import Register from './components/Login/Register';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home/Home';

export const server ="https://leetstore-server.onrender.com";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes> 
      <Toaster/>
      </div>
    </BrowserRouter>
    </>
    
  );
};

export default App;
