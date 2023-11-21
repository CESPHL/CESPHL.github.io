import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import dashicn from '../Assets/inactive-dash.svg';
import clock from '../Assets/inactive-clock.svg';
import profile from '../Assets/active-profile.svg';
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

const Profile1 = () => {
	const employee_id = localStorage.getItem('employee_id');
	const [attendanceData, setAttendanceData] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:4000/api/talents/${employee_id}`)
			.then(response => {
				setAttendanceData(response.data);
			}).catch(err => {
				console.log(err);
			});
	}, [employee_id]);

	useEffect(() => {
		if (attendanceData.clients) {
			const clientNames = attendanceData.clients.map(client => client.client_name).join(', ');
			const projectNames = attendanceData.clients.flatMap(client => client.projects.map(project => project.project_name));
			const projectsString = projectNames.join(', ');
			document.getElementById("employeeID").value = attendanceData.employee_id;
			document.getElementById("employeeName").value = attendanceData.first_name + " " + attendanceData.last_name;
			document.getElementById("emailAdd").value = attendanceData.email;
			document.getElementById("contactNum").value = attendanceData.contact_number;
			document.getElementById("clientName").value = clientNames;
			document.getElementById("projectName").value = projectsString;
			document.getElementById("managerName").value = attendanceData.manager_name;
			document.getElementById("userLevel").value = attendanceData.user_level;
		}
	}, [attendanceData])

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
				<div className="mainContent">
					<h3>User Details</h3>
					<NavLink to="/changepass">
						<button className="change-pass-btn">Change Password</button>
					</NavLink>
					<form>
						<span>Employee ID</span><br /><input type="text" name="employeeID" id="employeeID" disabled="disabled" value="---" /><br />
						<span>Employee Name</span><br /><input type="text" name="employeeName" id="employeeName" disabled="disabled" value="---" /><br />
						<span>Email Address</span><br /><input type="text" name="emailAdd" id="emailAdd" disabled="disabled" value="---" /><br />
						<span>Contact Number</span><br /><input type="text" name="contactNum" id="contactNum" disabled="disabled" value="---" /><br />
						<span>Client Assigned</span><br /><input type="text" name="clientName" id="clientName" disabled="disabled" value="---" /><br />
						<span>Project Assigned</span><br /><input type="text" name="projectName" id="projectName" disabled="disabled" value="---" /><br />
						<span>Reporting Manager</span><br /><input type="text" name="managerName" id="managerName" disabled="disabled" value="---" /><br />
						<span>User Level</span><br /><input type="text" name="userLevel" id="userLevel" disabled="disabled" value="---" /><br />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile1;
