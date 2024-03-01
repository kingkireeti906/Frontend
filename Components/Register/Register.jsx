import React, { useState } from "react";
import image from "../../src/assets/Images/Art.png";
import styles from "./Register.module.css";
import Eyeicon from "../../src/assets/Icons/view.png";
import { registeruser } from '../../Apis/auth.js';
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate each field
    const newErrors = {};
    let hasErrors = false;

    if (!data.name) {
      newErrors.name = "Name is required";
      hasErrors = true;
    }

    if (!data.email) {
      newErrors.email = "Email is required";
      hasErrors = true;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      hasErrors = true;
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    const response = await registeruser({ ...data })

    console.log(response)
    if (response && response.success) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.name);
      navigate('/');
    }
  }
  const navigatefunction = () => {
    navigate('/login')
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.back}></div>
        <img src={image} alt="leftside_artimage" className={styles.image} />
        <p className={styles.leftsideText}>Welcome aboard, my friend</p>
        <p className={styles.leftsideText2}>
          Just a couple of clicks and we start{" "}
        </p>
      </div>
      <div className={styles.rightContainer}>
        <p id={styles.register}>Register</p>
        <div className={styles.form}>
          <form>
            <div>
              <input
                type="text"
                value={data.name}
                name="name"
                placeholder="Name"
                className={styles.name}
                onChange={handlechange}
              />
              <p className={styles.error}>{errors.name}</p>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className={styles.email}
                value={data.email}
                onChange={handlechange}
              />
              <p className={styles.error}>{errors.email}</p>
            </div>
            <div className={`${styles.inputContainer} ${styles.passwordContainer}`}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.password}
                name="password"
                value={data.password}
                onChange={handlechange}
              />
              <img
                src={Eyeicon}
                alt="Toggle Password Visibility"
                className={`${styles.eyeIcon} ${styles.inputIcon}`}
                onClick={togglePasswordVisibility}
              />
              <p className={styles.error}>{errors.password}</p>
            </div>
            <div className={`${styles.inputContainer} ${styles.passwordContainer}`}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                className={styles.confirmPassword}
                value={data.confirmPassword}
                onChange={handlechange}
              />
              <img
                src={Eyeicon}
                alt="Toggle confirmPassword Visibility"
                className={`${styles.eyeIcon} ${styles.inputIcon}`}
                onClick={toggleConfirmPasswordVisibility}
              />
              <p className={styles.error}>{errors.confirmPassword}</p>
            </div>
            <button className={styles.button} onClick={(e) => handleSubmit(e)}>
              Register
            </button>
          </form>
          <p className={styles.existaccount}> Have an account ?</p>
          <button className={styles.loginbutton} onClick={navigatefunction}>Log in</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
