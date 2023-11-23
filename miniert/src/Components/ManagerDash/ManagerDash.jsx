import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './managerDash.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import accIcon from '../Assets/acc-active.svg';
import talents from '../Assets/mng-talent-inactive.svg';
import reports from '../Assets/report-inactive.svg';
import profile from '../Assets/inactive-profile.svg';
import view from '../Assets/view-icn.svg';
import edit from '../Assets/edit-icn.svg';


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

const ManageAccount = () => {

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
							<NavLink to="/manage-accounts">
								<img src={accIcon} alt="dashboard icon" activeclassname="active"/>
								<span>Manage Accounts</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/timesheet">
								<img src={talents} alt="clock icon" />
								<span className="inactive">Manage Talents</span>
							</NavLink>
						</li>
                        <li>
							<NavLink to="/timesheet">
								<img src={reports} alt="clock icon" />
								<span className="inactive">Reports</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/profile">
								<img src={profile} alt="profile icon" />
								<span  className="inactive">Profile</span>
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
          <h4>Manage Accounts</h4>
          <span>
            <CurrentDate />
          </span>
        </div>
        <div className="main-content">
          <div className="search-bar">
            <form action=" ">
              <input type="text" placeholder="Search Client" />
            </form>
            <div className="client-dropdown">
              <select>
                <option>Client</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
              <select>
                <option>Sort</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
            <div className="buttons">
              <button className="upload-btn">Upload</button>
              <button className="add-btn" onClick={ c}>
                Add
              </button>
              </NavLink>
            </div>
          </div>
    <div className="customTableContainer">
   <div className="customTableHeader">
    <h1>ID</h1>
    <h1>Name</h1>
    <h1>SDM/SDL</h1>
    <h1>SDM/SDL Email</h1>
    <h1>SDM/SDL Contact</h1>
    <h1>Actions</h1>
  </div>
  <div className="customTableContent">
    <p>---</p>
    <p>---</p>
    <p>---</p>
    <p>---</p>
    <p>---</p>
    <p><img src = {view}/><img src={edit}/></p>
  </div>
  </div>
      </div>
      </div>
      </div>
  );
};

export default ManageAccount;