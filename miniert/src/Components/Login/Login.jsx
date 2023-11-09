import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import login_pic from '../Assets/loginPic.png';

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();

    //Make a post request to the backend
    try{
      const response = await  fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });
      if(response.ok){
        //Successful login
        console.log('Successfully logged in');
        //redirect tp the dashboard or others
        navigate('/dashboard');
    }else{
      //Failed login
      console.log('Failed login');
      //Make an error message.
    }
  }catch(error){
    console.error("Error during Login", error);
  }
  }
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
            <input type="text" placeholder="Enter Username" required name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input password-input">
            <label>Password</label><br/>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              id='password'
            />
            <div className="eye-icon" onClick={handleTogglePassword}></div>
          </div>
        </div>
        <div className="login-btn">
          <button onClick={handleLogin}>Log In</button>
        </div>
        <div className="forgot-pass">Forgot Password? <span onClick={() => window.location.href='/forgotpass' }>Click here.</span></div>
      </div>
    </div>
  );
}

export default Login;

