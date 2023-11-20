import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import dashicn from '../Assets/inactive-dash.svg';
import clock from '../Assets/inactive-clock.svg';
import profile from '../Assets/active-profile.svg';


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
                <img src={profile} alt="profile icon" activeClassName="active" />
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
        <NavLink to ="/changepass">
        <button className="change-pass-btn">Change Password</button>
        </NavLink>
        <form>
        <span>Employee ID</span><br/><input type="text" name="employeeID" disabled="disabled" value="2781082"/><br/>
        <span>Employee Name</span><br/><input type="text" name="employeeName" disabled="disabled" value="Ian Dela Cruz"/><br/>
        <span>Email Address</span><br/><input type="text" name="emailAdd" disabled="disabled" value="ian.delacruz@collaberadigital.com"/><br/>
        <span>Contact Number</span><br/><input type="text" name="contactNum" disabled="disabled" value="09123456789"/><br/>
        <span>Client Assigned</span><br/><input type="text" name="clientName" disabled="disabled" value="GCash"/><br/>
        <span>Project Assigned</span><br/><input type="text" name="projectName" disabled="disabled" value="Mynt"/><br/>
        <span>Reporting Manager</span><br/><input type="text" name="managerName" disabled="disabled" value="Sir Martin" /><br/>
        <span>User Level</span><br/><input type="text" name="userLevel" disabled="disabled" value="Talent"/><br/>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Profile1;