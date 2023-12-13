import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./managerDash.css";
import hourglass from "../Assets/hourglass.svg";
import logicon from "../Assets/logout.svg";
import accIcon from "../Assets/acc-active.svg";
import talents from "../Assets/mng-talent-inactive.svg";
import reports from "../Assets/report-inactive.svg";
import profile from "../Assets/inactive-profile.svg";
import exporticon from "../Assets/export.svg";
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

const ManageAccount = () => {
    const employee_id = localStorage.getItem("employee_id");
    let managerName;
    const [employeeData, setEmployeeData] = useState();

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/talents`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setEmployeeData(data);
            })
            .catch((err) => {
                console.error(err);
            });
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [employee_id]);

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
                            <NavLink to="/manage-accounts">
                                <img src={accIcon} alt="dashboard icon" />
                                <span className="inactive">Manage Accounts</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manage-talents">
                                <img src={talents} alt="talents icon" />
                                <span className="inactive">Manage Talents</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports">
                                <img src={reports} alt="clock icon" activeclassname="active" />
                                <span>Reports</span>
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
                    <h4>Reports</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="manage-content">
                    <div className="search-bar">
                        <form action=" ">
                            <input type="text" placeholder="Search user by name" />
                        </form>
                        <div className="buttons">
                            <button className="upload-btn">Upload</button>
                            <NavLink to="/admin/manage-users/add-user">
                                <button className="add-btn">Add</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="table-container">
                        <div className="table-header">
                            <h1>ID</h1>
                            <h1>Talent Name</h1>
                            <h1>Email</h1>
                            <h1>Contact No.</h1>
                            <h1>Actions</h1>
                        </div>
                        <div className="table-content">
                            <p>---</p>
                            <p>---</p>
                            <p>---</p>
                            <p>---</p>
                            <p>
                                <button className="delete-btn"><img src={exporticon} alt="export" /></button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAccount;
