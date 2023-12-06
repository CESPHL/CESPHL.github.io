import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import hourglass from "../Assets/hourglass.svg";
import logicon from "../Assets/logout.svg";
import accIcon from "../Assets/acc-active.svg";
import talents from "../Assets/mng-talent-inactive.svg";
import profile from "../Assets/inactive-profile.svg";
import users from "../Assets/users-inactive.svg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const EditUser = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [userData, setUserData] = useState();
    const findEmployee = window.location.href.split("/").pop();

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/admin/${findEmployee}/`)
            .then((response) => {
                const data = response.data;
                document.getElementById("empId").value = data.employee_id;
                document.getElementById("employeeName").value = `${data.first_name} ${data.last_name}`;
                document.getElementById("email").value = data.email;
                document.getElementById("contactNo").value = data.contact_number;
                if (data.user_level !== "Admin") {
                    document.getElementById("assignedClient");
                    document.getElementById("assignedProject");
                    document.getElementById("reportingManager");
                }
                else {
                    document.getElementById("assignedClient").value = "N/A";
                    document.getElementById("assignedProject").value = "N/A";
                    document.getElementById("reportingManager").value = "N/A";
                }
                document.getElementById("userLevel").value = data.user_level;
            })
            .catch((err) => {
                console.error(err);
                toast.error("Internal server error. Please try again later.", {
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
                    <h4>Edit User</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="user-container">
                    <div className="user-info">
                        <label className="required-label" for="empId">Employee ID</label>
                        <input type="text" name="empId" id="empId" required />
                        <label className="required-label" for="employeeName">Employee Name</label>
                        <input type="text" name="employeeName" id="employeeName" required />
                        <label className="required-label" for="email">Email Address</label>
                        <input type="text" name="email" id="email" required />
                        <label className="required-label" for="contactNo">Contact Number</label>
                        <input type="text" name="contactNo" id="contactNo" required />
                        <label className="required-label" for="assignedClient">Client Assigned</label>
                        <input type="text" name="assignedClient" id="assignedClient" required />
                        <label className="required-label" for="assignedProject">Project Assigned</label>
                        <input type="text" name="assignedProject" id="assignedProject" required />
                        <label className="required-label" for="reportingManager">Reporting Manager</label>
                        <input type="text" name="reportingManager" id="reportingManager" required />
                        <label className="required-label" for="userLevel">User Level</label>
                        <input type="text" name="userLevel" id="userLevel" required />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;