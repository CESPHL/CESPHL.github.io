import React, { useState, useEffect, Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import ModalDash from '../../Components/DashModal/Modal.jsx';
import ModalOT from '../../Components/DashModal/OTmodal.jsx';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import dashicn from '../Assets/dashboard-icn.svg';
import clock from '../Assets/inactive-clock.svg';
import profile from '../Assets/inactive-profile.svg';
import axios from 'axios';
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



const Stopwatch = () => {
	// Variables for data
	const [talentData, setTalentData] = useState([]);
	const employee_id = localStorage.getItem('employee_id');
	const [currentDate, setCurrentDate] = useState(new Date());
	const currentTime = new Date();
	const isTimedIn = JSON.parse(localStorage.getItem("isTimedIn"));
	const options = { hour: 'numeric', minute: '2-digit', hour12: true };
	const formattedTime = currentTime.toLocaleTimeString('en-US', options);
	const formattedDate = currentDate.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
	const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const currentDay = weekDay[currentTime.getDay()];
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	// Variables for modals
	const [isTimeInModalVisible, setIsTimeInModalVisible] = useState(false);
	const [isTimeOutModalVisible, setIsTimeOutModalVisible] = useState(false);

	// Variables for buttons
	const [isTimeInDisabled, setIsTimeInDisabled] = useState(isTimedIn);
	const [isTimeOutDisabled, setIsTimeOutDisabled] = useState(!isTimedIn);


	useEffect(() => {
		let interval;

		if (isTimedIn === true) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => {
					if (prevSeconds === 59) {
						// If seconds reach 59, reset to 0 and update minutes
						setMinutes((prevMinutes) => {
							if (prevMinutes === 59) {
								// If minutes reach 59, reset to 0 and update hours
								setHours((prevHours) => prevHours + 1);
								return 0;
							} else {
								return prevMinutes + 1;
							}
						});
						return 0;
					} else {
						return prevSeconds + 1;
					}
				});
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => {
			clearInterval(interval);
		};
	}, [isTimedIn]);

	useEffect(() => {
		axios.get(`http://localhost:4000/api/talents/${employee_id}`)
			.then(response => {
				// Assuming the response is an array of objects
				const data = response.data;
				// Set the data in your component state
				setTalentData(data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	// console.log("Hours: " + hours);
	// console.log("Minutes: " + minutes);
	// console.log("Seconds: " + seconds);

	// localStorage.setItem("hours", hours);
	// localStorage.setItem("minutes", minutes);
	// localStorage.setItem("seconds", seconds);

	// Opening and closing of the time in modal
	const openTimeInModal = () => {
		setIsTimeInModalVisible(true);
	}
	const closeTimeInModal = () => {
		setIsTimeInModalVisible(false);
	};

	// Opening and closing of the time out modal
	const openTimeOutModal = () => {
		setIsTimeOutModalVisible(true);
	}

	const closeTimeOutModal = () => {
		setIsTimeOutModalVisible(false);
	}

	// Get the user input from the modal then pass it to the api
	// If successful
	// Enable the time out button
	// Disable the time in button
	// Set the isTimedIn at the localStorage to true
	// Save to database
	// Close modal
	// Start stopwatch
	const HandleTimeIn = () => {
		const projectName = document.getElementById("projectDropdown");
		const selectedProject = projectName.options[projectName.selectedIndex].text;
		const timeInData = {
			time_in: formattedTime,
			date: formattedDate,
			day: currentDay,
			project_name: selectedProject,
			client_name: document.getElementById("clientName").value
		}

		axios.patch(`http://localhost:4000/api/talents/${employee_id}/timein`, timeInData)
			.then(res => {
				if (res.status === 200) {
					setIsTimeInDisabled(true);
					setIsTimeOutDisabled(false);
					localStorage.setItem("isTimedIn", true); // Used in disabling the buttons
					localStorage.setItem("isNormalShiftDone", false); // Used in disabling the buttons
					closeTimeInModal();
				}
				else {
					toast.error('There was trouble timing in.', {
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
			})
	};

	// Get the current time and date and pass it to the api
	// If successful
	// Enable the OT time in button 
	// Disable the time out button
	// Change the stored isTimedIn value at the localStorage
	// Save to database
	// Close the modal
	// Stop stopwatch
	// If unsuccessful, display an error toast
	const handleTimeOut = () => {
		const projectName = document.getElementById("projectDropdown");
		const selectedProject = projectName.options[projectName.selectedIndex].text;
		const timeOutData = {
			time_out: formattedTime,
			date: formattedDate,
			day: currentDay,
			project_name: selectedProject,
			client_name: document.getElementById("clientName").value
		}

		console.log(timeOutData);
		axios.patch(`http://localhost:4000/api/talents/${employee_id}/timeout`, timeOutData)
			.then(res => {
				if (res.status === 200) {
					setIsTimeOutDisabled(true);
					setIsTimeInDisabled(false)
					localStorage.setItem("isTimedIn", false);
					localStorage.setItem("isNormalShiftDone", true);
					closeTimeOutModal();
				}
				else {
					toast.error('There was trouble timing out.', {
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
			})
			.catch(error => {
				console.error('Error during timeout request:', error);
				// Handle the error, e.g., show a toast message or log it
				toast.error('There was an error during timeout request.', {
					// ... other options for toast notification
				});
			});
	};

	return (
		<div>
			<div className="dash-timer">
				<p id="hours">{localStorage.getItem("hours") ? String(hours).padStart(2, '0') : "00"}:</p>
				<p id="minutes">{localStorage.getItem("minutes") ? String(minutes).padStart(2, '0') : "00"}:</p>
				<p id="seconds">{localStorage.getItem("seconds") ? String(seconds).padStart(2, '0') : "00"}</p>
			</div>
			<div className="timer-btn">
				<button onClick={openTimeInModal} disabled={isTimeInDisabled} className="timein-btn">
					Clock In
				</button>
				<button onClick={openTimeOutModal} disabled={isTimeOutDisabled} className="timeout-btn">
					Clock Out
				</button>
			</div>
			<ModalDash id="timeInModal" show={isTimeInModalVisible} handleClose={closeTimeInModal} handleSave={HandleTimeIn}>
				<div className="modal-content">
					<p>Confirm Clock In</p>
				</div>
				<input type="text" id="talentName" name="name" disabled="disabled" value={talentData.first_name + " " + talentData.last_name} /><br />
				<input type="text" id="timeIn" name="date-time" disabled="disabled" value={formattedDate + " | " + formattedTime} /><br />
				<input type="text" id="clientName" name="client" disabled="disabled" value="GCash" />
				<select id="projectDropdown">
					<option defaultValue disabled> Select a Project</option>
					<option>GCash-Mynt</option>
					<option>Project Name</option>
				</select>
			</ModalDash>
			<ModalDash id="timeOutModal" show={isTimeOutModalVisible} handleClose={closeTimeOutModal} handleSave={handleTimeOut}>
				<div className="modal-content">
					<p>Confirm Clock Out</p>
				</div>
				<input type="text" id="talentName" name="name" disabled="disabled" value={talentData.first_name + " " + talentData.last_name} /><br />
				<input type="text" id="timeIn" name="date-time" disabled="disabled" value={formattedDate + " | " + formattedTime} /><br />
				<input type="text" id="clientName" name="client" disabled="disabled" value="GCash" />
				<select id="projectDropdown">
					<option defaultValue disabled> Select a Project</option>
					<option>GCash-Mynt</option>
					<option>Project Name</option>
				</select>
			</ModalDash>
		</div >
	);
};

const OTStopwatch = () => {
	// Variables for data
	const [talentData, setTalentData] = useState([]);
	const employee_id = localStorage.getItem('employee_id');
	const [currentDate, setCurrentDate] = useState(new Date());
	const currentTime = new Date();
	const isTimedInOT = () => {
		// To allow the time in OT
		// isTimedIn should be false
		// isNormalShiftDone should be true
		// isTimedInOT should return false to clock in OT
		let isTimedIn = JSON.parse(localStorage.getItem("isTimedInOT")); // True by default, is set to false after clicking time in OT button
		let isNormalShiftDone = JSON.parse(localStorage.getItem("isNormalShiftDone")); // Set to true by clocking out of regular shift.
		// console.log(isTimedIn);
		// console.log(isNormalShiftDone);
		if (isTimedIn === false && isNormalShiftDone === true) {
			return false
		}
	};
	// console.log(isTimedInOT());
	const options = { hour: 'numeric', minute: '2-digit', hour12: true };
	const formattedTime = currentTime.toLocaleTimeString('en-US', options);
	const formattedDate = currentDate.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
	const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const currentDay = weekDay[currentTime.getDay()];
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	// Variables for modals
	const [isTimeInOTModalVisible, setIsTimeInOTModalVisible] = useState(false);
	const [isTimeOutOTModalVisible, setIsTimeOutOTModalVisible] = useState(false);

	// Variables for buttons
	const [isTimeInOTDisabled, setIsTimeInOTDisabled] = useState(isTimedInOT());
	const [isTimeOutOTDisabled, setIsTimeOutOTDisabled] = useState(!isTimedInOT());


	useEffect(() => {
		let interval;

		if (isTimedInOT === true) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => {
					if (prevSeconds === 59) {
						// If seconds reach 59, reset to 0 and update minutes
						setMinutes((prevMinutes) => {
							if (prevMinutes === 59) {
								// If minutes reach 59, reset to 0 and update hours
								setHours((prevHours) => prevHours + 1);
								return 0;
							} else {
								return prevMinutes + 1;
							}
						});
						return 0;
					} else {
						return prevSeconds + 1;
					}
				});
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => {
			clearInterval(interval);
		};
	}, [isTimedInOT()]);

	// console.log("Hours: " + hours);
	// console.log("Minutes: " + minutes);
	// console.log("Seconds: " + seconds);

	// localStorage.setItem("hours", hours);
	// localStorage.setItem("minutes", minutes);
	// localStorage.setItem("seconds", seconds);

	// Opening and closing of the time in modal
	const openTimeInOTModal = () => {
		setIsTimeInOTModalVisible(true);
	}
	const closeTimeInOTModal = () => {
		setIsTimeInOTModalVisible(false);
	};

	// Opening and closing of the time out modal
	const openTimeOutOTModal = () => {
		setIsTimeOutOTModalVisible(true);
	}

	const closeTimeOutOTModal = () => {
		setIsTimeOutOTModalVisible(false);
	}

	// Get the user input from the modal then pass it to the api
	// If successful
	// Enable the time out button
	// Disable the time in button
	// Set the isTimedIn at the localStorage to true
	// Save to database
	// Close modal
	// Start stopwatch
	const HandleTimeInOT = () => {
		const projectName = document.getElementById("projectDropdown");
		const selectedProject = projectName.options[projectName.selectedIndex].text;
		const timeInData = {
			ot_time_in: formattedTime,
			date: formattedDate,
			day: currentDay,
			project_name: selectedProject,
			client_name: document.getElementById("clientName").value
		}

		axios.patch(`http://localhost:4000/api/talents/${employee_id}/timeinOT`, timeInData)
			.then(res => {
				if (res.status === 200) {
					setIsTimeInOTDisabled(true);
					setIsTimeOutOTDisabled(false);
					localStorage.setItem("isTimedIn", true);
					closeTimeInOTModal();
				}
				else {
					toast.error('There was trouble timing in.', {
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
			})
	};

	// Get the current time and date and pass it to the api
	// If successful
	// Enable the OT time in button 
	// Disable the time out button
	// Change the stored isTimedIn value at the localStorage
	// Save to database
	// Close the modal
	// Stop stopwatch
	// If unsuccessful, display an error toast
	const HandleTimeOutOT = () => {
		setIsTimeOutOTDisabled(true);
		const timeOutData = {
			ot_time_out: formattedTime,
			date: formattedDate
		}
		console.log(timeOutData);
		axios.patch(`http://localhost:4000/api/talents/${employee_id}/timeoutOT`, timeOutData)
			.then(res => {
				if (res.status === 200) {
					setIsTimeOutOTDisabled(true);
					setIsTimeInOTDisabled(false)
					localStorage.setItem("isTimedIn", false);
					closeTimeOutOTModal();
				}
				else {
					toast.error('There was trouble timing out.', {
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
			})
	};

	useEffect(() => {
		axios.get(`http://localhost:4000/api/talents/${employee_id}`)
			.then(response => {
				// Assuming the response is an array of objects
				const data = response.data;
				// Set the data in your component state
				setTalentData(data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div id="OTGridItem">
			<div className="dash-timer">
				<p id="hours">{localStorage.getItem("hours") ? String(hours).padStart(2, '0') : "00"}:</p>
				<p id="minutes">{localStorage.getItem("minutes") ? String(minutes).padStart(2, '0') : "00"}:</p>
				<p id="seconds">{localStorage.getItem("seconds") ? String(seconds).padStart(2, '0') : "00"}</p>
			</div>
			<div className="timer-btn">
				<button onClick={openTimeInOTModal} disabled={isTimeInOTDisabled} className="timein-btn">
					Clock In
				</button>
				<button onClick={openTimeOutOTModal} disabled={isTimeOutOTDisabled} className="timeout-btn">
					Clock Out
				</button>
			</div>
			<ModalDash id="timeInModal" show={isTimeInOTModalVisible} handleClose={closeTimeInOTModal} handleSave={HandleTimeInOT}>
				<div className="modal-content">
					<p>Confirm Clock In (Overtime)</p>
				</div>
				<input type="text" id="talentName" name="name" disabled="disabled" value={talentData.first_name + " " + talentData.last_name} /><br />
				<input type="text" id="timeIn" name="date-time" disabled="disabled" value={formattedDate + " | " + formattedTime} /><br />
				<input type="text" id="clientName" name="client" disabled="disabled" value="GCash" />
				<select id="projectDropdown">
					<option defaultValue disabled> Select a Project</option>
					<option>GCash-Mynt</option>
					<option>Project Name</option>
				</select>
			</ModalDash>
			<ModalDash id="timeOutModal" show={isTimeOutOTModalVisible} handleClose={closeTimeOutOTModal} handleSave={HandleTimeOutOT}>
				<div className="modal-content">
					<p>Confirm Clock Out (Overtime)</p>
				</div>
				<input type="text" id="talentName" name="name" disabled="disabled" value={talentData.first_name + " " + talentData.last_name} /><br />
				<input type="text" id="timeIn" name="date-time" disabled="disabled" value={formattedDate + " | " + formattedTime} /><br />
				<input type="text" id="clientName" name="client" disabled="disabled" value="GCash" />
				<select id="projectDropdown">
					<option defaultValue disabled> Select a Project</option>
					<option>GCash-Mynt</option>
					<option>Project Name</option>
				</select>
			</ModalDash>
		</div >
	);
};


const TimesheetTable = () => {
	const [attendanceData, setAttendanceData] = useState([]);
	const employee_id = localStorage.getItem('employee_id');
	useEffect(() => {
		axios.get(`http://localhost:4000/api/talents/${employee_id}`)
			.then(response => {
				setAttendanceData(response.data.attendance);
			}).catch(err => {
				console.log(err);
			});
	}, []);

	return (
		<div className="tableContainer">
			<div className="tableHeader">
				<h1>Time In</h1>
				<h1>Time Out</h1>
				<h1>Date</h1>
				<h1>Day</h1>
				<h1>Client</h1>
				<h1>Project</h1>
				<h1>OT Time In</h1>
				<h1>OT Time Out</h1>
			</div>
			<div className="tableContent">
				{attendanceData.map(attendance => (
					<div key={attendance.date}>
						{attendance.time_in ? <p>{attendance.time_in}</p> : <p>----------</p>}
						{attendance.time_out ? <p>{attendance.time_out}</p> : <p>----------</p>}
						{attendance.date ? <p>{attendance.date}</p> : <p>----------</p>}
						{attendance.day ? <p>{attendance.day}</p> : <p>----------</p>}
						{attendance.client_name ? <p>{attendance.client_name}</p> : <p>----------</p>}
						{attendance.project_name ? <p>{attendance.project_name}</p> : <p>----------</p>}
						{attendance.ot_time_in ? <p>{attendance.ot_time_in}</p> : <p>----------</p>}
						{attendance.ot_time_out ? <p>{attendance.ot_time_out}</p> : <p>----------</p>}
					</div>
				))}
			</div>
		</div>
	);
}

const handleLogout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('employee_id');
	localStorage.removeItem('user_level');
};

class MyDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	render() {
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
							<span style={{}}>
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
								<NavLink to="/dashboard" activeclassname="active">
									<img src={dashicn} alt="dashboard icon" />
									<span>Dashboard</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="/forgotpass">
									{/*placeholder directory*/}
									<img src={clock} alt="clock icon" />
									<span className="inactive">Timesheet</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="/resetpass">
									{/*placeholder directory*/}
									<img src={profile} alt="profile icon" />
									<span className="inactive">Profile</span>
								</NavLink>
							</li>
						</div>
					</div>
					<div className="logout-btn">
						<img src={logicon} alt="logout icon" />
						<NavLink to="/">
							<button onClick={handleLogout}>Log Out</button>
						</NavLink>
					</div>
				</div>
				<div className="dashboard-content">
					<div className="dash-text">
						<h5>Dashboard</h5>
						<span>
							<CurrentDate />
						</span>
					</div>
					<div className="dashboard-main-content">
						<div className="grid-container">
							<div className="grid-item">
								<span>Regular Shift</span>
								<Stopwatch />
							</div>
							<div className="grid-item">
								<span>Overtime</span>
								<OTStopwatch />
							</div>
						</div>
						<div className="tracked-hours">
							<h4>TRACKED HOURS</h4>
						</div>
						<TimesheetTable />
					</div>
				</div>
			</div>
		);
	}
}

export default MyDashboard;