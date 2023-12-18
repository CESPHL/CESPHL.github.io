import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './addAccount.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import accIcon from '../Assets/acc-active.svg';
import talents from '../Assets/mng-talent-inactive.svg';
import profile from '../Assets/inactive-profile.svg'
import users from "../Assets/users-inactive.svg";
import Modal from "../Modals/Modal.jsx";


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
        const clientData = {
            client_id: document.getElementById("clientID").value,
            client_name: document.getElementById("clientName").value,
            client_address: document.getElementById("clientAddress").value,
            client_poc_name: document.getElementById("clientPOCName").value,
            client_poc_email: document.getElementById("clientPOCEmail").value,
            client_sdm_name: document.getElementById("clientSDMName").value,
            client_sdm_email: document.getElementById("clientSDMEmail").value,
            client_sdm_contact: document.getElementById("clientSDMContact").value,
            client_project: document.getElementById("clientProject").value
        };
        console.log(clientData);
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
                                <img src={accIcon} alt="dashboard icon" activeclassname="active" />
                                <span>Manage Accounts</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manage-talents">
                                <img src={users} alt="users icon" />
                                <span className="inactive">Manage Talents</span>
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
                        <span>Client ID</span><br /><input type="text" placeholder="Enter client ID" id="clientID" required /><br />
                        <span>Client Name</span><br /><input type="text" placeholder="Enter client name" id="clientName" required /><br />
                        <span>Location</span><br /><input type="text" placeholder="Enter client address" id="clientAddress" required /><br />
                        <span>Client POC Name</span><br /><input type="text" placeholder="Enter client POC name" id="clientPOCName" required /><br />
                        <span>Client POC Email</span><br /><input type="text" placeholder="Enter client POC email" id="clientPOCEmail" required /><br />
                        <span>SDM/SDL</span><br /><input type="text" placeholder="Enter SDM/SDL" id="clientSDMName" required /><br />
                        <span>SDM/SDL Email</span><br /><input type="text" placeholder="Enter SDM/SDL email" id="clientSDMEmail" required /><br />
                        <span>SDM/SDL Contact No.</span><br /><input type="text" placeholder="Enter SDM/SDL Contact No." id="clientSDMContact" required /><br />
                        <NavLink to="/manage-accounts">
                            <button>Cancel</button>
                        </NavLink>
                        <input type="button" value="Add" class="add-btn1" onClick={handleOpenModal} />
                    </form>
                </div>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                <div>
                    <p>Add Account</p>
                    <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                </div>
                <p className="modal-description">Clicking yes will add the account details and its project to the system. Do you wish to continue?</p>
                <div>
                    <button className="btn btn-close" onClick={handleCloseModal}> Cancel</button>
                    <button className="btn btn-save" onClick={handleSave}>Yes, Save</button>
                </div>
            </Modal>
        </div>
    );
};

export default AddAccount;