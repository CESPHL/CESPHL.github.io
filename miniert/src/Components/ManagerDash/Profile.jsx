import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./managerDash.css";
import hourglass from "../Assets/hourglass.svg";
import logicon from "../Assets/logout.svg";
import accIcon from "../Assets/acc-active.svg";
import talents from "../Assets/mng-talent-inactive.svg";
import reports from "../Assets/report-inactive.svg";
import profile from "../Assets/inactive-profile.svg";
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

const Profile = () => {
    const employee_id = localStorage.getItem("employee_id");

    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}`)
            .then((response) => {
                setEmployeeData(response.data)
            })
            .catch((err) => {
                toast.error('Account not found.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
    }, [employee_id]);

    useEffect(() => {
        console.log(employeeData);
        const clientNames = employeeData.clients.map((client) => client.client_name).join(', ');
        const clientsWithProjects = employeeData.clients.map((client) => {
            const projectNames = client.projects.map((project) => project.project_name).join(', ');
            return `${client.client_name} (${projectNames})`;
        }).join(', ');
        document.getElementById("employeeID").value = employeeData.employee_id ? employeeData.employee_id : "N/A";
        document.getElementById("employeeName").value = employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : "N/A";
        document.getElementById("emailAdd").value = employeeData.email ? employeeData.email : "N/A";
        document.getElementById("contactNum").value = employeeData.contact_number ? employeeData.contact_number : "N/A";
        document.getElementById("clientName").value = clientNames;
        document.getElementById("projectName").value = clientsWithProjects;
        document.getElementById("managerName").value = employeeData ? employeeData.manager_name : "N/A";
        document.getElementById("userLevel").value = employeeData.user_level ? employeeData.user_level : "N/A";
    }, [employeeData]);

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
                            <NavLink to="/manager/manage-accounts">
                                <img src={accIcon} alt="dashboard icon" />
                                <span className="inactive">Manage Accounts</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/manage-talents">
                                <img src={talents} alt="users icon" />
                                <span className="inactive">Manage Talents</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/reports">
                                <img src={reports} alt="clock icon" />
                                <span className="inactive">Reports</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/profile">
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
                    <NavLink to="/manager/profile/changepass">
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