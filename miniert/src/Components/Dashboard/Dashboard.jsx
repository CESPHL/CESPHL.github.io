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
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [isTimeIn, setIsTimeIn] = useState(false);
	const [isTimeOutDisabled, setIsTimeOutDisabled] = useState(true);

	useEffect(() => {
		let interval;

		if (isTimeIn) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => {
					if (prevSeconds === 59) {
						setMinutes((prevMinutes) => {
							if (prevMinutes === 59) {
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
	}, [isTimeIn]);

  const startTimer = () => {
    setIsTimeIn(true);
    setIsTimeOutDisabled(false);
  };

  const handleTimeOut = () => {
    setIsTimeIn(false);
    setIsTimeOutDisabled(true);
  };

  const handleSave = () => {
    setIsTimeIn(true);
	  
  };

  const handleCloseModal = () => {
    setIsTimeIn(false);
  };
  const [talentData, setTalentData] = useState([]);
  const employee_id = localStorage.getItem('employee_id');

  useEffect(() => {
	axios.get(`http://localhost:4000/api/talents/${employee_id}`)
	  .then(response => {
		// Assuming the response is an array of objects
		const data = response.data;
		// Set the data in your component state
		setTalentData(data);
		console.log("DATAA", data);
		// Log the first names
		data.forEach(talent => console.log(talent.first_name));
	  })
	  .catch(err => {
		console.log(err);
	  });
  }, []);
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
  
	const currentTime = new Date();
	const options = { hour: 'numeric', minute: '2-digit', hour12: true };

	const formattedTime = currentTime.toLocaleTimeString('en-US', options);


  return (
	
    <div>
      <div className="dash-timer">
        <p>
          {String(hours).padStart(2, '0')}:
          {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </p>
      </div>
      <div className="timer-btn">
        <button onClick={handleSave} disabled={isTimeIn} className="timein-btn">
          Clock In
        </button>
        <button onClick={handleTimeOut} disabled={isTimeOutDisabled} className="timeout-btn">
          Clock Out
        </button>
      </div>
      <ModalDash show={isTimeIn} handleClose={handleCloseModal} handleSave={startTimer}>
        <div className="modal-content">
          <p>Confirm Clock In</p>
          </div>
          <input type="name" disabled="disabled" value={talentData.first_name + " " + talentData.last_name} /><br />
          <input type="date-time" disabled="disabled" value={formattedDate + " | " + formattedTime} /><br />
          <input type="client" disabled="disabled" value="GCash" />
          <select>
            <option value="" selected disabled> Select a Project</option>
            <option value="">GCash-Mynt</option>
            <option value="">Project Name</option>	
          </select>
        </ModalDash>
    </div>
  );
};
//FOR OVERTIME MODAL AND TIMER
const StopwatchOT = () => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [isTimeIn, setIsTimeIn] = useState(false);
	const [isTimeOutDisabled, setIsTimeOutDisabled] = useState(true);

	useEffect(() => {
		let interval;

		if (isTimeIn) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => {
					if (prevSeconds === 59) {
						setMinutes((prevMinutes) => {
							if (prevMinutes === 59) {
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
	}, [isTimeIn]);

  const startTimer = () => {
    setIsTimeIn(true);
    setIsTimeOutDisabled(false);
  };

  const handleTimeOut = () => {
    setIsTimeIn(false);
    setIsTimeOutDisabled(true);
  };

  const handleSave = () => {
    setIsTimeIn(true);
  };

  const handleCloseModal = () => {
    setIsTimeIn(false);
  };

  return (
    <div>
      <div className="dash-timer">
        <p>
          {String(hours).padStart(2, '0')}:
          {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </p>
      </div>
      <div className="timer-btn">
        <button onClick={handleSave} disabled={isTimeIn} className="timein-btn">
          Clock In
        </button>
        <button onClick={handleTimeOut} disabled={isTimeOutDisabled} className="timeout-btn">
          Clock Out
        </button>
      </div>
      <ModalDash show={isTimeIn} handleClose={handleCloseModal} handleSave={startTimer}>
        <div className="modal-content">
          <p>Confirm Clock In <span>(Overtime)</span></p>
          </div>
          <input type="name" disabled="disabled" value="Juan Dela Cruz" /><br />
          <input type="date-time" disabled="disabled" value="November 06, 2023 | 09:29 AM" /><br />
          <input type="client" disabled="disabled" value="GCash" />
          <select>
            <option value="" selected disabled> Select a Project</option>
            <option value="">GCash-Mynt</option>
            <option value="">Project Name</option>
          </select>
        </ModalDash>
    </div>
  );
};



const TimesheetTable = () => {
	const [attendanceData, setAttendanceData] = useState([]);
	const employee_id = localStorage.getItem('employee_id');
	useEffect(() => {
		axios.get(`http://localhost:4000/api/talents/${employee_id}`)
			.then(response => {
				setAttendanceData(response.data.attendance);
				response.data.attendance.forEach(attendance => {
					console.log(attendance);
				});
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
					<div>
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
									<StopwatchOT />
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