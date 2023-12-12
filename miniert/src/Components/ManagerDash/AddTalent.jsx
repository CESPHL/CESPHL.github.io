import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './addAccount.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import accIcon from '../Assets/building-inactive.svg';
import talents from '../Assets/talents-active.svg';
import reports from '../Assets/report-inactive.svg';
import profile from '../Assets/inactive-profile.svg';
import AddAccModal from '../../Components/DashModal/AddAccModal.jsx';


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
const AddAccount = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
    }
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
                                <img src={accIcon} alt="dashboard icon" />
                                <span className="inactive">Manage Accounts</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manage-talents">
                                <img src={users} alt="users icon" activeclassname="active" />
                                <span>Manage Talents</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports">
                                <img src={talents} alt="clock icon" />
                                <span className="inactive">Reports</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/profile">
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
                    <h4>Add Account</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="add-mainContent">
                    <form>
                        <span>Client ID</span><br /><input type="text" placeholder="Enter client ID" required /><br />
                        <span>Client Name</span><br /><input type="text" placeholder="Enter client name" required /><br />
                        <span>Location</span><br /><input type="text" placeholder="Enter client address" required /><br />
                        <span>Client POC Name</span><br /><input type="text" placeholder="Enter client POC name" required /><br />
                        <span>Client POC Email</span><br /><input type="text" placeholder="Enter client POC email" required /><br />
                        <span>SDM/SDL</span><br /><input type="text" placeholder="Enter SDM/SDL" required /><br />
                        <span>SDM/SDL Email</span><br /><input type="text" placeholder="Enter SDM/SDL email" required /><br />
                        <span>SDM/SDL Contact No.</span><br /><input type="text" placeholder="Enter SDM/SDL Contact No." required /><br />
                        <span>Project</span><br /><input type="text" placeholder="Enter Project" required /><br />
                        <NavLink to="/manage-talents">
                            <button>Cancel</button>
                        </NavLink>
                        <input type="submit" value="Add" class="add-btn1" onClick={handleOpenModal} />
                    </form>
                </div>
                {/*add conditions for when the modal opens.
				for now, it shows upon clicking the yes button*/}
                <AddAccModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleSave={handleSave}>
                    <p>Add Account</p>
                    <span>Clicking yes will add the account details and its project to the system.
                        <br />Do you wish to continue?
                    </span>
                </AddAccModal>
            </div>
        </div>
    );
};

export default AddAccount;