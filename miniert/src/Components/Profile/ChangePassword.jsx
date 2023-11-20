import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './changepass.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import dashicn from '../Assets/inactive-dash.svg';
import clock from '../Assets/inactive-clock.svg';
import profile from '../Assets/active-profile.svg';
import ChangePassModal from '../../Components/DashModal/ChangePassModal.jsx';

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

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    // Perform save action here, for now show modal only
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        <div className="change-pass-content">
        <h3>Change Password</h3>
        <div className="pass-fields">
                    <label>Old Password</label> <br />
                    <input type="password" placeholder='••••••••'/><br /><br />
                    <label>New Password</label> <br />
                    <input type="password" placeholder='••••••••'/> <br/><br/>
                    <label>Confirm Password</label> <br />
                    <input type="password" placeholder='••••••••'/>
                </div>
        </div>
                <div className="conditions">
                    <p>Must be at least 8 characters</p>
                    <p>Must contain one special character</p>
                </div>
                <button className="cancel-btn">Cancel</button>
                <button className="pass-submitbtn" onClick={handleSave}>Save</button>
                <ChangePassModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSave={handleSave}>
                    <p>Change Password</p>
                    <span>Clicking yes will update your
                        current password with the new one.
                        <br/>Do you wish to continue?
                    </span>
                </ChangePassModal>
        </div>
      </div>
  );
};

export default Profile;
