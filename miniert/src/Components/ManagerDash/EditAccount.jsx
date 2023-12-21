import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './EditAccount.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import accIcon from '../Assets/acc-active.svg';
import talents from '../Assets/mng-talent-inactive.svg';
import reports from '../Assets/report-inactive.svg';
import profile from '../Assets/inactive-profile.svg';
import EditAccModal from '../../Components/DashModal/EditAccModal.jsx';


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
                            <NavLink to="/manager/manage-accounts">
                                <img src={accIcon} alt="dashboard icon" activeclassname="active" />
                                <span>Manage Accounts</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/manage-talents">
                                <img src={talents} alt="talents icon" />
                                <span className="inactive">Manage Talents</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/reports">
                                <img src={reports} alt="reports icon" />
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
                    <h4>Edit Account</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="custom-add-mainContent">
                    <h3>Account Details</h3>
                    <form>
                        <span>Client ID</span><br />
                        <textarea rows="1" cols="50" required></textarea><br />

                        <span>Client Name</span><br />
                        <textarea rows="1" cols="50" required></textarea><br />

                        <span>Location</span><br />
                        <textarea rows="4" cols="50" style={{ resize: 'none', height: '50px' }} required></textarea><br />

                        <span>Client POC Name</span><br />
                        <textarea rows="1" cols="50" required></textarea><br />

                        <span>Client POC Email</span><br />
                        <textarea rows="1" cols="50" required></textarea><br />

                        <span>SDM/SDL</span><br />
                        <textarea rows="1" cols="50" required></textarea><br />

                        <span>SDM/SDL Email</span><br />
                        <textarea rows="1" cols="50" required></textarea><br />

                        <span>SDM/SDL Contact No.</span><br />
                        <textarea rows="1" cols="50" required></textarea><br />

                        <span>Project</span><br />
                        <textarea rows="1" cols="50" required></textarea><br />

                        <NavLink to="/manager/manage-accounts">
                            <button>Cancel</button>
                        </NavLink>
                        <input type="submit" value="Save" className="custom-add-btn1" onClick={handleOpenModal} />
                    </form>
                </div>
                {/*add conditions for when the modal opens.
				for now, it shows upon clicking the yes button*/}
                <EditAccModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleSave={handleSave}>
                    <p>Edit Account</p>
                    <span>Clicking yes will update all the changes made to this account.
                        <br />Do you wish to continue?
                    </span>
                </EditAccModal>
            </div>
        </div>
    );
};

export default AddAccount;