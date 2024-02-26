import React from 'react'
import styles from './Logout.module.css';
import {useNavigate } from 'react-router-dom'
import { useState } from 'react';

function Logout({cancellation}) {
  const [data,setdata]=useState(true);
  const [background, backgroundupdate] = useState(false);
  const navigate= useNavigate();
  const logout =()=>{
    backgroundupdate(true)
    localStorage.removeItem("token");
   

    navigate('/login')
}
const cancel =()=>{
  cancellation(true)
  backgroundupdate(false)
}
  return (
    <div className={styles.maincontainer} style={background ? { backgroundColor: 'rgba(48, 61, 675, 0.55)' } : {}}>
         <div className={styles.container}>
        <div className={styles.text}> Are you sure you want to Logout?</div>
        <button className={styles.logout} onClick={logout}> Yes,  Logout</button>
        <button className={styles.cancel} onClick={cancel}> Cancel</button>
        
    </div>
    </div>
   
  )
}

export default Logout