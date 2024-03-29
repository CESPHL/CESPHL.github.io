// React imports
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Icons
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import dashicn from '../Assets/inactive-dash.svg';
import clock from '../Assets/active-clock.svg';
import profile from '../Assets/inactive-profile.svg';

// Files
import './Timesheet.css';

// External functionalities
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

const Timesheet = () => {
	const employee_id = localStorage.getItem('employee_id');
	const [attendanceData, setAttendanceData] = useState([]);
	const [groupedData, setGroupedData] = useState([]);
	const [selectedWeekIndex, setSelectedWeekIndex] = useState(0); // Track the selected week index
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get(`https://cesphl-github-io-backend.vercel.app/api/talents/${employee_id}`)
			.then(response => {
				setAttendanceData(response.data.attendance);
				setLoading(false);
			}).catch(err => {
				setError(err);
				setLoading(false);
			});
	}, [employee_id]);

	useEffect(() => {
		if (attendanceData.length > 0) {
			const groupByWeek = (attendanceData) => {
				const weeklyAttendance = [];
				attendanceData.forEach((entry) => {
					// Compututation of total hours 
					let TotalHours; // Regular hours + OT Hours
					let TotalMinutes;
					if (entry.time_in && entry.time_out) {
						let startTimeStr = entry.time_in;
						let endTimeStr = entry.time_out;
						let otTotalHours = 0;
						let otTotalMinutes = 0;

						// Only gets executed if entry has OT data
						if (entry.ot_time_in && entry.ot_time_out) {
							let otStartTimeStr = entry.ot_time_in;
							let otEndTimeStr = entry.ot_time_out;
							let otStartTimeHours = parseInt(otStartTimeStr.split(":")[0]);
							let otStartTimeMinutes = parseInt(otStartTimeStr.split(":")[1].slice(0, 2));
							let otEndTimeHours = parseInt(otEndTimeStr.split(":")[0]);
							let otEndTimeMinutes = parseInt(otEndTimeStr.split(":")[1].slice(0, 2));
							if (otStartTimeStr.includes("PM")) {
								otStartTimeHours += 12; // Convert PM times to 24-hour format
							}
							if (otEndTimeStr.includes("PM")) {
								otEndTimeHours += 12; // Convert PM times to 24-hour format
							}

							const otTimeDiffMinutes = (otEndTimeHours * 60 + otEndTimeMinutes) - (otStartTimeHours * 60 + otStartTimeMinutes);
							otTotalHours = Math.floor(otTimeDiffMinutes / 60);
							otTotalMinutes = otTimeDiffMinutes % 60;
						}
						let startTimeHours = parseInt(startTimeStr.split(":")[0]);
						let startTimeMinutes = parseInt(startTimeStr.split(":")[1].slice(0, 2));
						let endTimeHours = parseInt(endTimeStr.split(":")[0]);
						let endTimeMinutes = parseInt(endTimeStr.split(":")[1].slice(0, 2));

						if (startTimeStr.includes("PM")) {
							startTimeHours += 12; // Convert PM times to 24-hour format
						}
						if (endTimeStr.includes("PM")) {
							endTimeHours += 12; // Convert PM times to 24-hour format
						}

						const timeDifferenceMinutes = (endTimeHours * 60 + endTimeMinutes) - (startTimeHours * 60 + startTimeMinutes);
						TotalHours = Math.floor(timeDifferenceMinutes / 60) + otTotalHours;
						TotalMinutes = (timeDifferenceMinutes % 60) + otTotalMinutes;

						// console.log(entry);
					}

					// Grouping of data by week
					const weekStartDate = new Date(entry.date);
					weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay()); // Set to the first day of the week (Sunday)

					const weekEndDate = new Date(weekStartDate);
					weekEndDate.setDate(weekEndDate.getDate() + 6); // Set to the last day of the week (Saturday)

					const weekKey = `${weekStartDate.toDateString()} - ${weekEndDate.toDateString()}`;

					// Log date and weekKey for troubleshooting
					// console.log("Date:", entry.date, "Week:", weekKey);

					// Check if the week already exists in the array and pushing it to the weeklyAttendance array
					const existingWeek = weeklyAttendance.find((week) => week.week === weekKey);
					if (existingWeek) {
						entry.total_hours = TotalHours;
						entry.total_minutes = TotalMinutes;
						existingWeek.entries.push(entry);
					}
					else {
						// If the week doesn't exist, create a new entry
						entry.total_hours = TotalHours;
						entry.total_minutes = TotalMinutes;
						weeklyAttendance.push({
							week: weekKey,
							entries: [entry],
						});
					}
				});

				// Add dummy data to the array
				// Find which group of data has less than 7 entries
				// Find which days are missing
				// Insert dummy data

				const expectedDaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

				const appendData = () => {
					weeklyAttendance.forEach((week) => {
						const existingDays = week.entries.map((entry) => entry.day);
						const missingDays = expectedDaysOfWeek.filter((day) => !existingDays.includes(day));
						console.log(missingDays);
						if (missingDays.length > 0) {
							missingDays.forEach((day, index) => {
								// Determine the missing date based on the week's start date
								const weekStartDate = new Date(week.entries[0].date); // Assuming the entries are sorted by date
								const missingDate = new Date(weekStartDate);
								missingDate.setDate(missingDate.getDate() + expectedDaysOfWeek.indexOf(day));

								// Create the dummyObject with _id, day, and date properties
								const dummyObject = {
									_id: index,
									day: day,
									date: missingDate.toISOString(), // Convert the date to a string or use any desired format
								};

								// Push the dummyObject into the week.entries array
								week.entries.push(dummyObject);
							});
						}
					});
				};
				appendData();
				return weeklyAttendance;
			};
			setGroupedData(groupByWeek(attendanceData));
		}
	}, [attendanceData]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	const handlePrevWeek = () => {
		setSelectedWeekIndex((prevIndex) => Math.max(0, prevIndex - 1));
	};

	const handleNextWeek = () => {
		setSelectedWeekIndex((prevIndex) => Math.min(groupedData.length - 1, prevIndex + 1));
	};

	// Function to format a date string
	const formatDate = (weekString) => {
		if (!weekString) {
			return 'N/A'; // Handle the case when weekString is not available
		}

		const [startDate, endDate] = weekString.split(' - ');

		if (!startDate || !endDate) {
			return 'Invalid Date Range'; // Handle the case when weekString is not in the expected format
		}

		const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
		const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

		return `${formattedStartDate} - ${formattedEndDate}`;
	};


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
								<img src={clock} alt="clock icon" activeclassname="active" />
								<span>Timesheet</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/profile">
								<img src={profile} alt="profile icon" />
								<span className="inactive">Profile</span>
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
					<h5>Timesheet</h5>
					<span>
						<CurrentDate />
					</span>
				</div>
				<div className="timesheet-content">
					<div className="filter">
						<span>{formatDate(groupedData[selectedWeekIndex]?.week)}</span>
						<button onClick={handlePrevWeek} disabled={selectedWeekIndex === 0}>{'<'}</button>
						<button onClick={handleNextWeek} disabled={selectedWeekIndex === groupedData.length - 1}>{'>'}</button>
					</div>
					<div>
						<TimesheetTable groupedData={groupedData} selectedWeekIndex={selectedWeekIndex} />
					</div>
				</div>
			</div>
		</div>
	);
};

const TimesheetTable = ({ groupedData, selectedWeekIndex }) => {
	if (!groupedData || groupedData.length === 0) {
		// console.log("No grouped data available");
		return <p>No data available</p>;
	}

	const selectedWeekData = groupedData[selectedWeekIndex];

	if (!selectedWeekData || !selectedWeekData.entries || selectedWeekData.entries.length === 0) {
		console.log("No data available for the selected week");
		return <p>No data available for the selected week</p>;
	}

	// console.log("Selected week data:", selectedWeekData);

	// Function to extract the day from the date string
	const getDayFromDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate();
		return day;
	};

	return (
		<div className="tableContainer">
			<div className="table-title">
				<h3>Weekly Timesheet</h3>
			</div>
			<div className="vertical-container">
				<div className="vertical-container-header">
					<p id="fill">‎ <br /> ‎</p>
					<p>Clock In</p>
					<p>Clock Out</p>
					<p>OT Clock In</p>
					<p>OT Clock Out</p>
					<p>Total Hours</p>
				</div>
				<div className="vertical-container-content">
					{selectedWeekData.entries.map((entry) => (
						<div key={entry._id} className={entry.day}>
							<p>{entry.day ? entry.day.substring(0, 3) : "---"} <br /> {getDayFromDate(entry.date) ? getDayFromDate(entry.date) : "---"}</p>
							<p>{entry.time_in ? entry.time_in : "----------"}</p>
							<p>{entry.time_out ? entry.time_out : "----------"}</p>
							<p>{entry.ot_time_in ? entry.ot_time_in : "----------"}</p>
							<p>{entry.ot_time_out ? entry.ot_time_out : "----------"}</p>
							<p>{entry.total_hours ? `${entry.total_hours}h ${entry.total_minutes}m ` : "----------"}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};



export default Timesheet;
