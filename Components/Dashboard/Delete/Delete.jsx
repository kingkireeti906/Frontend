import React from 'react';
import styles from './Delete.module.css'
 
function DeletePopup({ onCancel, onDelete }) {
  return (
    <div className={styles.overlay}>
    <div className={styles.popup_container}>
      <p className={styles.message}>Are you sure you want to delete?</p>
      <button onClick={onDelete} className={styles.delete}>Yes, Delete</button>
      <button onClick={onCancel} className={styles.cancel}>Cancel</button>
    </div>
    </div>
  );
}
 
export default DeletePopup;