import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import hourglass from "../Assets/hourglass.svg";
import logicon from "../Assets/logout.svg";
import accIcon from "../Assets/acc-active.svg";
import talents from "../Assets/mng-talent-inactive.svg";
import profile from "../Assets/inactive-profile.svg";
import users from "../Assets/users-inactive.svg";
import view from "../Assets/view-icn.svg";
import edit from "../Assets/edit-icn.svg";
import axios from "axios";
import modal from "../Modals/Modal.jsx";
import Modal from "../Modals/Modal.jsx";
import './addUser.css';

const CurrentDate = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return <p>{formattedDate}</p>;
};

const Profile = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSave = async (e) => {
        e.preventDefault();
    }

    return (
        <div className="dashboard">
            <div className="dash-navbar">
                <div className="dash-main">
                    <img src={hourglass} alt="" />
                    <span>
                        <span
                            style={{
                                fontWeight: "bold",
                                color: "#684CE2",
                                fontSize: "14px",
                                paddingLeft: "0px",
                            }}
                        >
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
                            <NavLink to="/admin/manage-accounts">
                                <img src={accIcon} alt="dashboard icon" />
                                <span className="inactive">Manage Accounts</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/manage-users">
                                <img src={users} alt="users icon" activeclassname="active" />
                                <span>Manage Users</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/manage-talents">
                                <img src={talents} alt="clock icon" />
                                <span className="inactive">Manage Talents</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/profile">
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
                    <h4>Add User</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="user-form">
                    <form>
                        <label for="empId">Employee ID</label>
                        <input type="text" placeholder="Enter ID" name="empId" id="empId" required />
                        <label for="firstName">First Name</label>
                        <input type="text" placeholder="Enter first name" name="firstName" id="firstName" required />
                        <label for="lastName">Last Name</label>
                        <input type="text" placeholder="Enter last name" name="lastName" id="lastName" required />
                        <label for="email">Email Address</label>
                        <input type="text" placeholder="Enter email" name="email" id="email" required />
                        <label for="contactNo">Contact Number</label>
                        <input type="text" placeholder="Enter contact no." name="contactNo" id="contactNo" required />
                        <label for="username">Username</label>
                        <input type="text" placeholder="Enter username" name="username" id="username" required />
                        <label for="password">Password</label>
                        <input type="text" placeholder="Enter password" name="password" id="password" required />
                        <label for="userLevel">User Level</label>
                        <select name="userLevel" id="userLevel" required>
                            <option disabled selected>Select</option>
                            <option value="Talent">Talent</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <div>
                            <NavLink to="/admin/manage-users">
                                <input type="button" className="btn btn-cancel" value="Cancel" />
                            </NavLink>
                            <input type="button" className="btn btn-submit" value="Add" onClick={handleOpenModal} />
                        </div>
                    </form>
                </div>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal} handleSave={handleSave}>
                <div>
                    <p>Add User</p>
                    <p>X</p>
                </div>
                <p>Clicking yes will add the account details and its project to the system.</p>
                <div className="buttons-container">
                    <button className="close-btn" onClick={handleCloseModal}> Close</button>
                    <button className="save-btn" onClick={handleSave}>Yes, Add</button>
                </div>
            </Modal>
        </div>
    );
};

export default Profile;