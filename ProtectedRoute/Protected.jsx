import React from 'react'

import {useNavigate } from 'react-router-dom'

import { useState,useEffect } from 'react'

export default function checking({Component}) {
    const navigate= useNavigate();
const  [active,setactive]= useState("");

useEffect(()=>{
    const token=localStorage.getItem("token")
    setactive(token);
},[]);  


return (
    <div>
      {active ? <Component /> : navigate('/register')}
    </div>
  );
}