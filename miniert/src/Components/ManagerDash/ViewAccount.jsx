import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './addAccount.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import accIcon from '../Assets/acc-active.svg';
import talents from '../Assets/mng-talent-inactive.svg';
import reports from '../Assets/report-inactive.svg';
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

  return <p>{formattedDate}</p>;
}
const ViewAccount = () => {
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
          <h4>View Account</h4>
          <span>
            <CurrentDate />
          </span>
      </div>
      <div className="view-content">
        <div className="top-content">
            <h3>Account Details</h3>
            <button className="edit-btn">Edit</button>
        </div>
	  <div className="add-mainContent">
					<form>
						<span>Client ID</span><br /><input type="text" placeholder="Enter client ID" required /><br />
						<span>Client Name</span><br /><input type="text" placeholder="Enter client name" required/><br />
						<span>Location</span><br /><input type="text" placeholder="Enter client address"required/><br />
						<span>Client POC Name</span><br /><input type="text" placeholder="Enter client POC name" required/><br />
						<span>Client POC Email</span><br /><input type="text" placeholder="Enter client POC email" required/><br />
						<span>SDM/SDL</span><br /><input type="text" placeholder="Enter SDM/SDL"required /><br />
						<span>SDM/SDL Email</span><br /><input type="text" placeholder="Enter SDM/SDL email" required/><br />
						<span>SDM/SDL Contact No.</span><br /><input type="text" placeholder="Enter SDM/SDL Contact No."required/><br />
						<span>Project</span><br /><input type="text" placeholder="Enter Project"required/><br />
						<NavLink to ="/manage-accounts">
						<button>Cancel</button>
						</NavLink>
						<input type="submit" value="Add" class ="add-btn1" onClick={handleOpenModal}/>
					</form>
				</div>
      </div>
      </div>
      </div>
  );
};

export default ViewAccount;