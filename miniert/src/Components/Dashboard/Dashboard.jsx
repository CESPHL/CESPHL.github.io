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
	const [hours, setHours] = useState(Number(localStorage.getItem('hours')));
	const [minutes, setMinutes] = useState(Number(localStorage.getItem('minutes')));
	const [seconds, setSeconds] = useState(Number(localStorage.getItem('seconds')));
	console.log("Variable: " + hours);
	console.log("Variable: " + minutes);
	console.log("Variable: " + seconds);
	console.log("Local: " + localStorage.getItem('hours'));
	console.log("Local: " + localStorage.getItem('minutes'));
	console.log("Local: " + localStorage.getItem('seconds'));
	const [isTimeOutDisabled, setIsTimeOutDisabled] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
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


	useEffect(() => {
		let interval;
		if (isTimedIn === true) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => {
					localStorage.setItem("savedSeconds", seconds);
					if (prevSeconds === 59) {
						localStorage.setItem("savedMinutes", minutes);
						setMinutes((prevMinutes) => {
							if (prevMinutes === 59) {
								localStorage.setItem("savedHours", hours);
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

	console.log("Hours: " + hours);
	console.log("Minutes: " + minutes);
	console.log("Seconds: " + seconds);

	const visibleModal = () => {
		setIsModalVisible(true);
	}

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};

	const HandleSave = () => {
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
				console.log(res.status);
				if (res.status === 200) {
					setIsTimeOutDisabled(false);
					localStorage.setItem("isTimedIn", true);
					handleCloseModal();
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

	const handleTimeOut = () => {
		setIsTimeOutDisabled(true);
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
		<div>
			<div className="dash-timer">
				<p>
					{localStorage.getItem('hours') ? localStorage.getItem('hours') :  String(hours).padStart(2, '0')}:
					{localStorage.getItem('minutes') ? localStorage.getItem('seconds') : String(minutes).padStart(2, '0')}:
					{localStorage.getItem('seconds') ? localStorage.getItem('seconds') : String(seconds).padStart(2, '0')}
				</p>
			</div>
			<div className="timer-btn">
				<button onClick={visibleModal} disabled={isTimedIn} className="timein-btn">
					Clock In
				</button>
				<button onClick={handleTimeOut} disabled={isTimeOutDisabled} className="timeout-btn">
					Clock Out
				</button>
			</div>
			<ModalDash show={isModalVisible} handleClose={handleCloseModal} handleSave={HandleSave}>
				<div className="modal-content">
					<p>Confirm Clock In</p>
				</div>
				<input type="text" id="talentName" name="name" disabled="disabled" value={talentData.first_name + " " + talentData.last_name} /><br />
				<input type="text" id="timeIn" name="date-time" disabled="disabled" value={formattedDate + " | " + formattedTime} /><br />
				<input type="text" id="clientName" name="client" disabled="disabled" value="GCash" />
				<select id="projectDropdown">
						// Pwedeng galing sa database
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