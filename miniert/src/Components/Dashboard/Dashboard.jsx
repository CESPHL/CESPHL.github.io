import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import dashicn from '../Assets/dashboard-icn.svg';
import clock from '../Assets/inactive-clock.svg';
import profile from '../Assets/inactive-profile.svg';

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

  return (
    <p>{formattedDate}</p>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="dash-navbar">
          <div className="dash-main">
            <img src={hourglass} alt="" />
            <span>
              <span style={{ fontWeight: 'bold', color: '#684CE2', fontSize: '14px', paddingLeft: '0px' }}>Collabera Digital</span>
              <br />External Resource Timesheet
            </span>
          </div>
          <div className="dash-list">
            <p>NAVIGATION</p>
            <div className="dash-1">
              <li>
                <NavLink to="/dashboard" activeClassName="active">
                  <img src={dashicn} />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/forgotpass">
                  <img src={clock} />
                  <span className="inactive">Timesheet</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/resetpass">
                  <img src={profile} />
                  <span className="inactive">Profile</span>
                </NavLink>
              </li>
            </div>
          </div>
          <div className="logout-btn">
            <img src={logicon} />
            <button onClick={handleLogin}>Log Out</button>
          </div>
      </div>
      <div className="dashboard-content">
        <div className="dash-text">
          <h5>Dashboard</h5>
          <span><CurrentDate /></span>
        </div>
        <div className="grid-container">
          <div className="grid-item">Regular Shift</div>
          <div className="grid-item">Overtime</div>
        </div>
      </div>
    </div>
  );

}

export default Dashboard;
