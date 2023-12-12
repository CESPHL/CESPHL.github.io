import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import hourglass from "../Assets/hourglass.svg";
import logicon from "../Assets/logout.svg";
import accIcon from "../Assets/acc-active.svg";
import talents from "../Assets/mng-talent-inactive.svg";
import profile from "../Assets/inactive-profile.svg";
import users from "../Assets/users-inactive.svg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// CSS
import "react-toastify/dist/ReactToastify.css";
import "./viewUser.css";

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

const ViewUser = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [userData, setUserData] = useState();
    const findEmployee = window.location.href.split("/").pop();

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/admin/${findEmployee}/`)
            .then((response) => {
                const data = response.data;
                setUserData(data);
                document.getElementById("empId").value = data.employee_id;
                document.getElementById("employeeName").value = `${data.first_name} ${data.last_name}`;
                document.getElementById("email").value = data.email;
                document.getElementById("contactNo").value = data.contact_number;
                if (data.user_level !== "Admin") {
                    const clientDetails = data.clients || [];
                    const clientNames = clientDetails.map(client => client.client_name);
                    const clientProjectsStrings = clientDetails.map(client => {
                        const projectNames = client.projects.map(project => project.project_name);
                        return `${client.client_name}: ${projectNames.join(', ')}`;
                    });
                    document.getElementById("assignedClient").value = clientNames.join(', ');
                    document.getElementById("assignedProject").value = clientProjectsStrings.join(', ');
                    document.getElementById("reportingManager").value = data.manager_name;
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
    }, [findEmployee]);

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
                            <NavLink to="/admin/manage-users" activeclassname="active">
                                <img src={users} alt="users icon" />
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
                    <h4>View User</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="user-container">
                    <div className="user-header">
                        <h3>User Details</h3>
                        <div>
                            {userData?.user_level === "Manager" ?
                                <Link to={`/admin/manage-users/view-user/${userData.employee_id}/view-talent`}>
                                    <button className="btn btn-cancel">View Talent</button>
                                </Link>
                                : null}
                            {userData ?
                                <Link to={`/admin/manage-users/edit-user/${userData.employee_id}`}>
                                    <button className="btn btn-submit">Edit</button>
                                </Link>
                                : <p>Loading...</p>}
                        </div>
                    </div>
                    <div className="user-info">
                        <label for="empId">Employee ID</label>
                        <input type="text" name="empId" id="empId" disabled />
                        <label for="employeeName">Employee Name</label>
                        <input type="text" name="employeeName" id="employeeName" disabled />
                        <label for="email">Email Address</label>
                        <input type="text" name="email" id="email" disabled />
                        <label for="contactNo">Contact Number</label>
                        <input type="text" name="contactNo" id="contactNo" disabled />
                        <label for="assignedClient">Client Assigned</label>
                        <input type="text" name="assignedClient" id="assignedClient" disabled />
                        <label for="assignedProject">Project Assigned</label>
                        <input type="text" name="assignedProject" id="assignedProject" disabled />
                        <label for="reportingManager">Reporting Manager</label>
                        <input type="text" name="reportingManager" id="reportingManager" disabled />
                        <label for="userLevel">User Level</label>
                        <input type="text" name="userLevel" id="userLevel" disabled />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUser;