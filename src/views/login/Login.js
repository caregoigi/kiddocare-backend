import './login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'src/hooks/useAuthStore';
import logo from '../../assets/images/logo.png';
import { Constants } from 'src/Constants';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';

const Login = () => {
  const { setToken } = useAuthStore();
  const router = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom Validation Logic
    if (!formData.username || !formData.password) {
      setErrorMessage('Username/Password is required');
      return;
    }

    try {
      const response = await fetch(Constants.adminLogIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        setToken(data.accessToken);
        router('/dashboard'); // Navigate to the Dashboard component
        console.log('Login successful!');
      } else {
        console.log(`Login failed with status: ${response.status}`);
        if (response.status === 400) {
          setErrorMessage('Invalid credentials. Please try again.');
        } else {
          setErrorMessage('An error occurred during login. Please try again later.');
        }
      }
    } catch (err) {
      console.log(`Login error: ${err}`);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (

    <div className="authentication-bg d-flex align-items-center justify-content-center w-100 vh-100">
      <div className="logo_top logo_container">
        
      </div>
      <div>
      <div className='text-center mb-5'>
         <img src={logo} className="w-40 logoLogin" alt="Logo" />
      </div>
        
      
      <form className="form_container" onSubmit={handleSubmit}>
        {/* <div className="logo_container">
        <img src={logo} className="w-40" alt="Logo" />
      </div> */}
        <div className="title_container">
          <p className="title">Welcome Back!</p>
          <span className="subtitle mb-3">Sign in to continue to Kiddocare.</span>
        </div>
        {errorMessage && <p className="error_message invalid">{errorMessage}</p>}
        <div className="input_container mb-3">
          <label className="input_label" htmlFor="username_field">
            Username
          </label>
          <FaUser className="icon" />
          <input
            onChange={handleChange}
            name="username"
            type="text"
            className="input_field"
            id="username_field"
            placeholder="Username"
          />
        </div>
        <div className="input_container mb-3">
          <label className="input_label" htmlFor="password_field">
            Password
          </label>
          <div className="password_input">
            <input
              onChange={handleChange}
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="input_field"
              id="password_field"
              placeholder="Password"
            />
            <button type="button" onClick={togglePasswordVisibility} className="eye_button">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button title="Sign In" type="submit" className="btn btn-primary w-100 mt-3 mb-5">
          <span>Log In</span>
        </button>
      </form>
      </div>
      <div className="footer_text">
        <div className='input_label'>&copy; Copyright {new Date().getFullYear()}, Kiddocare. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default Login;
