import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './viewAccount.css';

// Icons
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import accIcon from '../Assets/acc-active.svg';
import talents from '../Assets/mng-talent-inactive.svg';
import reports from '../Assets/report-inactive.svg';
import profile from '../Assets/inactive-profile.svg';
import view from "../Assets/view-icn.svg";
import edit from "../Assets/edit-icn.svg";

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
    const accountId = currentUrl.pathname.split('/').pop();

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}`)
            .then((response) => {
                console.log(response.data);
                const filteredClients = response.data.clients.filter(client => client.client_id === accountId);
                console.log(filteredClients);
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

    console.log(clientData);
    console.log(clientData[0]);

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
                            <NavLink to="/manager/manage-accounts">
                                <img src={accIcon} alt="dashboard icon" activeclassname="active" />
                                <span>Manage Accounts</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/manage-talents">
                                <img src={talents} alt="talents icon" />
                                <span className="inactive">Manage Talents</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/reports">
                                <img src={reports} alt="reports icon" />
                                <span className="inactive">Reports</span>
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
                    <h4>View Account</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="view-content">
                    <div className="top-content">
                        <h3>Account Details</h3>
                        <button className="edit-btn">Edit</button>
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
                                        <textarea name="clientAddress" id="clientAddress" value={client_address} disabled />
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
                                        <img src={view} />
                                        <img src={edit} />
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