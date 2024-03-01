import React, { useState } from 'react';
import styles from './Settings.module.css';
import Eyeicon from '../../../src/assets/Icons/view.png';
import { updatepassword } from '../../../Apis/auth';


function Setting() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    oldpassword: '',
    newpassword: '',
  });
  const [errors, setErrors] = useState({
    name: "",
    oldpassword: "",
    newpassword: "",
  });

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updatefunction = async (e) => {
    e.preventDefault();

    // Validate each field
    const newErrors = {};
    let hasErrors = false;

    if (!data.name) {
      newErrors.name = "Name is required";
      hasErrors = true;
    }

    if (!data.oldpassword) {
      newErrors.oldpassword = "Old Password is required";
      hasErrors = true;
    }

    if (!data.newpassword) {
      newErrors.newpassword = "New Password is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    const result = await updatepassword({ ...data })
    if (result) {
      console.log(result);

    }
  };


  return (
    <div>
      <div className={styles.container}>
        <p id={styles.sectionname}>Settings</p>
        <div className={styles.formcontainer}>
          <form>
            <div className={styles.inputContainer}>
              <input
                type="name"
                placeholder="Name"
                name="name"
                className={styles.name}
                onChange={handlechange}
                value={data.name}
              />
            </div>
            <p className={styles.error}>{errors.name}</p>
            <div className={styles.inputContainer}>
              <input
                type={showOldPassword ? 'text' : 'password'}
                placeholder="OldPassword"
                name="oldpassword"
                className={styles.Oldpassword}
                value={data.oldpassword}
                onChange={handlechange}
              />
              <img
                src={Eyeicon}
                alt="Toggle OldPassword Visibility"
                className={styles.eyeIcon}
                onClick={toggleOldPasswordVisibility}
              />
            </div>
            <p className={styles.error}>{errors.oldpassword}</p>
            <div className={styles.inputContainer}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="NewPassword"
                name="newpassword"
                className={styles.Newpassword}
                value={data.newpassword}
                onChange={handlechange}
              />
              <img
                src={Eyeicon}
                alt="Toggle NewPassword Visibility"
                className={styles.eyeIcon}
                onClick={toggleNewPasswordVisibility}
              />
            </div>
            <p className={styles.error}>{errors.newpassword}</p>
          </form>
          <button className={styles.updatebutton} onClick={updatefunction}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
