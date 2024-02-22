import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registerpage from '../pages/Register/Register';
import Loginpage from '../pages/Login/Login';


function App() {
  return (
    <div>
      <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Registerpage />} />
                <Route path="/login" element={<Loginpage />} />
            </Routes>
        </BrowserRouter>
        
    </div>
  )
}

export default App