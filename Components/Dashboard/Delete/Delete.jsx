import React from 'react';
import styles from './Delete.module.css'
import { deleteData } from '../../../Apis/board';
 
function DeletePopup({ onCancel, onDelete,_id }) {
  console.log({_id})
  const onDeleted =async()=>{
    const response= await deleteData({_id});
    console.log(response.data)
   
    onDelete()
  
  }
  return (
    <div className={styles.overlay}>
    <div className={styles.popup_container}>
      <p className={styles.message}>Are you sure you want to delete?</p>
      <button onClick={onDeleted} className={styles.delete} >Yes, Delete</button>
      <button onClick={onCancel} className={styles.cancel}>Cancel</button>
    </div>
    </div>
  );
}
 
export default DeletePopup;