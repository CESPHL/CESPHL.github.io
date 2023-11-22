import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './changepass.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import dashicn from '../Assets/inactive-dash.svg';
import clock from '../Assets/inactive-clock.svg';
import profile from '../Assets/active-profile.svg';
import ChangePassModal from '../../Components/DashModal/ChangePassModal.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CurrentDate = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const formattedDate = currentDate.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	return <p>{formattedDate}</p>;
};

const Profile = () => {
	const employee_id = localStorage.getItem('employee_id');
	const [showModal, setShowModal] = useState(false);
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const handleOpenModal = () => {
		setShowModal(true);
	}

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const isPasswordValid = () => {
		const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
		if (password !== password2) {
			return false;
		}
		return passwordRegex.test(password);
	};


	const handleSave = async (e) => {
		e.preventDefault();
		try {
			if (isPasswordValid() === true) {
				const response = await fetch(`http://localhost:4000/api/talents/changepass/${employee_id}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ oldPassword, password, password2 }),
				});
				if (response.ok) {
					// If response is ok, show a toast
					handleCloseModal();
					toast.success('Password successfully changed.', {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
				}
				else {
					toast.error(response.json(), {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
				}
			}
			else {
				toast.error("Error. Please make sure your password meets the requirements and your inputs for new password and confirm password matches.", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			}
		}
		catch (err) {
			console.log('Failed login');
			// Make an error message.
			toast.error('Something went wrong.', {
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
	};

	return (
		<div className="dashboard">
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
			<div className="dash-navbar">
				<div className="dash-main">
					<img src={hourglass} alt="" />
					<span>
						<span style={{ fontWeight: 'bold', color: '#684CE2', fontSize: '14px', paddingLeft: '0px' }}>
							Collabera Digital
						</span>
						<br />
						External Resource Timesheet
					</span>
				</div>
				<div className="dash-list">
					<p>NAVIGATION</p>
					<div className="dash-1">
						<li>
							<NavLink to="/dashboard">
								<img src={dashicn} alt="dashboard icon" />
								<span className="inactive">Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/timesheet">
								<img src={clock} alt="clock icon" />
								<span className="inactive">Timesheet</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/profile">
								<img src={profile} alt="profile icon" activeclassname="active" />
								<span>Profile</span>
							</NavLink>
						</li>
					</div>
				</div>
				<div className="logout-btn">
					<img src={logicon} alt="logout icon" />
					<NavLink to="/">
						<button>Log Out</button>
					</NavLink>
				</div>
			</div>
			<div className="dashboard-content">
				<div className="dash-text">
					<h5>Manage Profile</h5>
					<span>
						<CurrentDate />
					</span>
				</div>
				<div className="change-pass-content">
					<h3>Change Password</h3>
					<div className="pass-fields">
						<label>Old Password</label> <br />
						<input type="password" name="oldPassword" id="oldPassword" placeholder='••••••••' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /><br /><br />
						<label>New Password</label> <br />
						<input type="password" name="password" id="password" placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
						<label>Confirm Password</label> <br />
						<input type="password" name="password2" id="password2" placeholder='••••••••' value={password2} onChange={(e) => setPassword2(e.target.value)} />
					</div>
				</div>
				<div className="conditions">
					<p>Must be at least 8 characters</p>
					<p>Must contain one special character</p>
				</div>
				<button className="cancel-btn">Cancel</button>
				<button className="pass-submitbtn" onClick={handleOpenModal}>Save</button>
				<ChangePassModal
					show={showModal}
					handleClose={handleCloseModal}
					handleSave={handleSave}>
					<p>Change Password</p>
					<span>Clicking yes will update your
						current password with the new one.
						<br />Do you wish to continue?
					</span>
				</ChangePassModal>
			</div>
		</div>
	);
};

export default Profile;
