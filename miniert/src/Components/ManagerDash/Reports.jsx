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
import Modal from "../Modals/Modal.jsx";
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

const ManageAccount = () => {
    const employee_id = localStorage.getItem('employee_id');
    const [employeeData, setEmployeeData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/talents`)
            .then((response) => {
                const data = response.data;
                axios.get(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}`)
                    .then((response) => {
                        const managerName = `${response.data.first_name} ${response.data.last_name}`;
                        const filteredData = data.filter((item) => item.manager_name === managerName);
                        setEmployeeData(filteredData);
                    })
                    .catch((err) => {
                        console.error(err);
                        toast.error('Manager not found.', {
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
            })
            .catch((err) => {
                console.error(err);
                toast.error('Internal Server Error. Please try again later.', {
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

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleExport = () => {
        console.log('Export');
        console.log(document.getElementById("startDate").value);
        console.log(document.getElementById("endDate").value);
        console.log(document.getElementById("startDate"));
        console.log(document.getElementById("endDate"));
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        console.log(startDate);
        console.log(endDate);
    };

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
                    </div>
                    <div className="table-container">
                        <div className="table-header five-cols">
                            <h1>ID</h1>
                            <h1>Talent Name</h1>
                            <h1>Email</h1>
                            <h1>Contact No.</h1>
                            <h1>Actions</h1>
                        </div>
                        {employeeData ? employeeData.map((employee) => (
                            <div className="table-content five-cols" key={employee.employee_id}>
                                <p>{employee.employee_id}</p>
                                <p>{`${employee.first_name} ${employee.last_name}`}</p>
                                <p>{employee.email}</p>
                                <p>{employee.contact_number}</p>
                                <p>
                                    <button className="delete-btn" onClick={handleOpenModal} ><img src={exporticon} alt="export" /></button>
                                </p>
                            </div>
                        )) : (<p>Loading...</p>)}
                    </div>
                </div>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal} className="export-modal">
                <div>
                    <p>Export</p>
                    <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                </div>
                <form>
                    <label for="startDate">Start Date</label>
                    <input type="date" name="startDate" id="startDate" />
                    <label for="endDate">End Date</label>
                    <input type="date" name="endDate" id="endDate" />
                </form>
                <div>
                    <button className="btn btn-close" onClick={handleCloseModal}>Cancel</button>
                    <button className="btn btn-save" onClick={handleExport}>Export</button>
                </div>
            </Modal>
        </div>
    );
};

export default ManageAccount;