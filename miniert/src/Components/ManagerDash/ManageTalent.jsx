import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './managerDash.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import accIcon from '../Assets/building-inactive.svg';
import talents from '../Assets/talents-active.svg';
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
								<img src={accIcon} alt="dashboard icon"/>
								<span className="inactive">Manage Accounts</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/manage-talents">
								<img src={talents} alt="clock icon" activeclassname="active"/>
								<span>Manage Talents</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/reports">
                            {/*page is non-existent. placeholder only. change to correct directory. */}
								<img src={reports} alt="clock icon" />
								<span className="inactive">Reports</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/profile-managers"> 
                            {/*page is non-existent. placeholder only. change to correct directory. */}
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
          <h4>Manage Accounts</h4>
          <span>
            <CurrentDate />
          </span>
        </div>
        <div className="manage-content">
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
              <NavLink to="/manage-talents/add-account">
              <button className="add-btn">
                Add
              </button>
              </NavLink>
            </div>
          </div>
    <div className="customTableContainer">
   <div className="customTableHeader">
    <h1>Talent ID</h1>
    <h1>Talent Name</h1>
    <h1>Email</h1>
    <h1>Contact No.</h1>
    <h1>Role</h1>
    <h1>Actions</h1>
  </div>
  <div className="customTableContent">
    <p>---</p>
    <p>---</p>
    <p>---</p>
    <p>---</p>
    <p>---</p>
    <p><img src = {view}/>
    <img src={edit}/>
    </p>
    </div>
    </div>
      </div>
      </div>
      </div>
  );
};

export default ManageAccount;