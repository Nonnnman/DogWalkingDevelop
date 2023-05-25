import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
          <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login"
              element={<Login />}
            />
            <Route 
              path="/signup"
              element={<Signup />}
            />            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
