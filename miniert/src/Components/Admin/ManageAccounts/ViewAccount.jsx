import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './viewAccount.css';

// Icons
import hourglass from '../../Assets/hourglass.svg';
import logicon from '../../Assets/logout.svg';
import accIcon from '../../Assets/acc-active.svg';
import talents from '../../Assets/mng-talent-inactive.svg';
import users from "../../Assets/users-inactive.svg";
import profile from '../../Assets/inactive-profile.svg';
import view from "../../Assets/view-icn.svg";
import edit from "../../Assets/edit-icn.svg";

// External functionalities
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

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return <p>{formattedDate}</p>;
}

const ViewAccount = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [clientData, setClientData] = useState([]);
    const currentUrl = new URL(window.location.href);
    const path = currentUrl.pathname;
    const parts = path.split('/');
    const manager_id = parts[3];
    const account_id = parts[5];

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/managers/${manager_id}`)
            .then((response) => {
                const filteredClients = response.data.clients.filter(client => client.client_id === account_id);
                setClientData(filteredClients);
            })
            .catch((err) => {
                console.error("Error retrieving client info.", err);
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
                            <NavLink to="/admin/manage-accounts" activeclassname="active">
                                <img src={accIcon} alt="dashboard icon" />
                                <span>Manage Accounts</span>
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
                    <h4>View Account</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="view-content">
                    <div className="top-content">
                        <h3>Account Details</h3>
                        <NavLink to={`/admin/manage-accounts/${manager_id}/edit-account/${account_id}`}>
                            <button className="edit-btn">Edit</button>
                        </NavLink>
                    </div>
                    {clientData ? (
                        clientData.map(({ client_id, client_name, client_address, client_sdm_name, client_sdm_email, client_sdm_contact }) => (
                            <div className="client-info" key={client_id}>
                                <div>
                                    <div>
                                        <label htmlFor="clientName">Client Name</label>
                                        <input type="text" name="clientName" id="clientName" value={client_name} disabled />
                                    </div>
                                    <div>
                                        <label htmlFor="clientAddress">Client Address</label>
                                        <textarea name="clientAddress" id="clientAddress" value={client_address} rows="5" disabled />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="sdmName">SDM / SDL Name</label>
                                        <input type="text" name="sdmName" id="sdmName" value={client_sdm_name} disabled />
                                    </div>
                                    <div>
                                        <label htmlFor="sdmEmail">SDM / SDL Email</label>
                                        <input type="text" name="sdmEmail" id="sdmEmail" value={client_sdm_email} disabled />
                                    </div>
                                    <div>
                                        <label htmlFor="sdmContact">SDM / SDL Contact No.</label>
                                        <input type="text" name="sdmContact" id="sdmContact" value={client_sdm_contact} disabled />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}

                    <div className="filters-row">
                        <div>
                            <form>
                                <input type="text" name="searchProject" id="searchProject" placeholder="Search project name" />
                                <select>
                                    <option>Work Shift</option>
                                </select>
                                <select>
                                    <option>Core Time</option>
                                </select>
                                <select>
                                    <option>Status</option>
                                </select>
                            </form>
                        </div>
                        <div>
                            <button id="uploadButton">Upload</button>
                            <NavLink to={`/admin/manage-accounts/${manager_id}/edit-account/${account_id}/add-project`}>
                                <button id="addButton">Add Project</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="project-table">
                        <div className="project-header">
                            <h1>ID</h1>
                            <h1>Project Name</h1>
                            <h1>Work Shift</h1>
                            <h1>Core Time</h1>
                            <h1>Status</h1>
                            <h1>Actions</h1>
                        </div>
                        {clientData.flatMap((client) =>
                            client.projects.map((project) => (
                                <div key={project._id} className="project-content">
                                    <p>{project.project_id}</p>
                                    <p>{project.project_name}</p>
                                    <p>{project.workshift}</p>
                                    <p>{project.coretime}</p>
                                    <p>{project.status}</p>
                                    <p>
                                        <NavLink to={`/admin/manage-accounts/${manager_id}/view-account/${account_id}/view-project/${project.project_id}`}>
                                            <img src={view} />
                                        </NavLink>
                                        <NavLink to={`/admin/manage-accounts/${manager_id}/view-account/${account_id}/edit-project/${project.project_id}`}>
                                            <img src={edit} />
                                        </NavLink>
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAccount;