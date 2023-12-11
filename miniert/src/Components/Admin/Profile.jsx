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
    const employee_id = localStorage.getItem("employee_id");

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
                                <img src={users} alt="users icon" />
                                <span className="inactive">Manage Users</span>
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
                                <img src={profile} alt="profile icon" activeclassname="active" />
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
                    <h4>Profile</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="mainContent">
                    <h3>User Details</h3>
                    <NavLink to="/profile/changepass">
                        <button className="change-pass-btn">Change Password</button>
                    </NavLink>
                    <form>
                        <span>Employee ID</span><br /><input type="text" name="employeeID" id="employeeID" disabled="disabled" value="---" /><br />
                        <span>Employee Name</span><br /><input type="text" name="employeeName" id="employeeName" disabled="disabled" value="---" /><br />
                        <span>Email Address</span><br /><input type="text" name="emailAdd" id="emailAdd" disabled="disabled" value="---" /><br />
                        <span>Contact Number</span><br /><input type="text" name="contactNum" id="contactNum" disabled="disabled" value="---" /><br />
                        <span>Client Assigned</span><br /><input type="text" name="clientName" id="clientName" disabled="disabled" value="---" /><br />
                        <span>Project Assigned</span><br /><input type="text" name="projectName" id="projectName" disabled="disabled" value="---" /><br />
                        <span>Reporting Manager</span><br /><input type="text" name="managerName" id="managerName" disabled="disabled" value="---" /><br />
                        <span>User Level</span><br /><input type="text" name="userLevel" id="userLevel" disabled="disabled" value="---" /><br />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;