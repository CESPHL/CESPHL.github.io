import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import login_pic from '../Assets/loginPic.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
		try {
			const response = await fetch('/login', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			if (response.ok) {

				//If response is successful then get the token
				const responseData = await response.json();
				const token = responseData.token;
				const employee_id = responseData.employee_id;
				const user_level = responseData.user_level;

				//set the token to the local storage
				localStorage.setItem('token', token);
				localStorage.setItem('employee_id', employee_id);
				localStorage.setItem('user_level', user_level);

				//Validate the token by sending request to the backend
				const validationResponse = await fetch('/validate-token', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`, //Sends token tin the headers
					}
				});

				const validationData = await validationResponse.json();
				const isTokenValid = validationData.isValid;

				if (isTokenValid) {
					// navigate('/dashboard');
					console.log('Token is valid');
					console.log(user_level);
					if (user_level === "Talent") {
						navigate('/dashboard');
					}
					else if (user_level === "Manager") {
						navigate('/manage-accounts');
					}
				} else {
					console.log('Token validation failed');
				}

			} else {
				//Failed login
				console.log('Failed login');
				// Make an error message.
				toast.error('Invalid username or password.', {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			}
		} catch (error) {
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
						<label>Password</label><br />
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
				<div className="forgot-pass">Forgot Password?<button onClick={() => window.location.href = '/forgotpass'}><span >Click here.</span></button></div>
			</div>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
}

export default Login;

