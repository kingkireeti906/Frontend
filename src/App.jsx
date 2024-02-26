import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registerpage from '../pages/Register/Register';
import Loginpage from '../pages/Login/Login';
import Homepage from '../Components/Dashboard/Homepage/Homepage';
import Checking from '../ProtectedRoute/Protected';
import 'react-calendar/dist/Calendar.css';

import Logout  from '../Components/Dashboard/Logout/Logout';

function App() {
  return (
    <div>
       <BrowserRouter>
            <Routes>
            <Route path="/" element={<Checking Component= {Homepage}/>}/> 
                <Route path="/register" element={<Registerpage />} />
                <Route path="/login" element={<Loginpage />} />

                
            </Routes>
        </BrowserRouter> 
        {/* <Logout/> */}
        
        
    </div>
  )
}

export default App