import React, { useState } from 'react';
import './Login.css';
import login_pic from '../Assets/loginPic.png';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='form-container'>
      <div className='img-container'>
        <img src={login_pic} alt="" />
      </div>
      <div className="header">
        <div className="greeting">Welcome back!</div>
        <p className="subtext">Log in to your account. Enter the following information below to proceed.</p>
        <div className="underline"></div>
        <div className="inputs">
          <div className="input">
            <label>Username</label><br />
            <input type="text" placeholder="Enter Username" required />
          </div>
          <div className="input password-input">
            <label>Password</label><br/>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="eye-icon" onClick={handleTogglePassword}></div>
          </div>
        </div>
        <div className="login-btn">
          <button>Log In</button>
        </div>
        <div className="forgot-pass">Forgot Password? <span>Click here.</span></div>
      </div>
    </div>
  );
}

export default Login;
