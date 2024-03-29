import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Icons
import hourglass from "../../Assets/hourglass.svg"
import logicon from "../../Assets/logout.svg";
import accIcon from "../../Assets/building-inactive.svg";
import talents from "../../Assets/talents-active.svg";
import profile from "../../Assets/inactive-profile.svg";
import users from "../../Assets/users-inactive.svg";

// Files
import "./viewTalent.css";

// External functionalities
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const ViewTalent = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [talentData, setTalentData] = useState(null);

    const currentUrl = new URL(window.location.href);
    const parts = currentUrl.pathname.split("/");
    const talentId = parts[parts.length - 1];

    // Check for account
    // To be used for security purposes to prevent url manipulation
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/admin/${employee_id}`)
            .then((response) => {
                console.log("Account found.");
            })
            .catch((err) => {
                toast.error("Account not found. Please login again.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.error(err);
                window.location.href = "/";
            });
    }, [employee_id]);

    // Get talent data and save it to variable
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/talents/${talentId}`)
            .then((response) => {
                setTalentData(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.error("Error retrieving talent info.", err);
                toast.error("Error retrieving talent info. Please try again later.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    }, [employee_id]);

    return (
        <div className="dashboard">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
                            <NavLink to="/admin/manage-talents" activeclassname="active">
                                <img src={talents} alt="clock icon" />
                                <span>Manage Talents</span>
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
                    <h4>View Talent</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="view-content">
                    <p>Employee ID</p>
                    <input type="text" value={talentData ? talentData.employee_id : ""} disabled />
                    <p>Employee Name</p>
                    <input
                        type="text"
                        value={talentData ? `${talentData.first_name} ${talentData.last_name}` : ""}
                        disabled
                    />
                    <p>Email Address</p>
                    <input type="text" value={talentData ? talentData.email : ""} disabled />
                    <p>Contact Number</p>
                    <input type="text" value={talentData ? talentData.contact_number : ""} disabled />
                    <p>Clients Assigned</p>
                    <input
                        type="text"
                        value={talentData ? talentData.clients.map((client) => client.client_name).join(", ") : ""}
                        disabled
                    />
                    <p>Projects Assigned</p>
                    <input
                        type="text"
                        value={
                            talentData
                                ? talentData.clients
                                    .map(
                                        (client) =>
                                            client.projects.map((project) => `${client.client_name} - ${project.project_name}`).join(", ")
                                    )
                                    .join(", ")
                                : ""
                        }
                        disabled
                    />
                    <p>Reporting Manager</p>
                    <input type="text" value={talentData ? talentData.manager_name : ""} disabled />
                </div>
            </div>
        </div>
    );
};

export default ViewTalent;