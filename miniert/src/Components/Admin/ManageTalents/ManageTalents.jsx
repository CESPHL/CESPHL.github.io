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

const ManageTalents = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [talentList, setTalentList] = useState([]);

    // Check for account
    // To be used for security purposes to prevent url manipulation
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/admin/${employee_id}`)
            .then((response) => {
                console.log(response.data);
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

    // Get list of talents for table
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/talents/`)
            .then((response) => {
                setTalentList(response.data);
            })
            .catch((err) => {
                console.error("Error retrieving talent info", err);
                toast.error("Error retrieving client info. Please try again later.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }, []);

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
                    <h4>Manage Talents</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="filters-row">
                    <div>
                        <form>
                            <input type="text" name="searchProject" id="searchProject" placeholder="Enter talent" />
                            <select>
                                <option>Sort</option>
                            </select>
                        </form>
                    </div>
                    <div>
                        <NavLink to={``}>
                            <button className="edit-btn">Upload</button>
                        </NavLink>
                        <NavLink to={`/admin/manage-accounts/${manager_id}/account/${account_id}/project/${project_id}/talents/add`}>
                            <button className="edit-btn">Add</button>
                        </NavLink>
                    </div>
                </div>
                <div className="table-container">
                    <div className="six-col header">
                        <h1>ID</h1>
                        <h1>Talent Name</h1>
                        <h1>Email</h1>
                        <h1 className="center-flex-text">Contact No</h1>
                        <h1>Role</h1>
                        <h1>Actions</h1>
                    </div>
                    {talentList ? talentList.map((talent) => (
                        <div className="six-col data" key={talent.employee_id}>
                            <p>{talent.employee_id}</p>
                            <p>{`${talent.first_name} ${talent.last_name}`}</p>
                            <p>{talent.email}</p>
                            <p className="center-flex-text">{talent.contact_number}</p>
                            <p>{/*role*/}</p>
                            <p>
                                <NavLink to={``}>
                                    <img src={view} />
                                </NavLink>
                                <NavLink to={``}>
                                    <img src={edit} />
                                </NavLink>
                            </p>
                        </div>
                    )) : (<p>Loading...</p>)}
                </div>
            </div>
        </div>
    );
};

export default ManageTalents;