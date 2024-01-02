import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './viewProject.css';

// Icons
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import accIcon from '../Assets/acc-active.svg';
import talents from '../Assets/mng-talent-inactive.svg';
import reports from '../Assets/report-inactive.svg';
import profile from '../Assets/inactive-profile.svg';

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

const ViewProject = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [clientData, setClientData] = useState([]);
    const [projectData, setProjectData] = useState({});
    const currentUrl = new URL(window.location.href);
    const pathSegments = currentUrl.pathname.split('/').filter(segment => segment !== '');
    const accountIdIndex = pathSegments.indexOf('view-account') + 1;
    const accountId = pathSegments[accountIdIndex];
    const projectIdIndex = pathSegments.indexOf('view-project') + 1;
    const projectId = pathSegments[projectIdIndex];

    console.log(accountId);
    console.log(projectId);

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

    useEffect(() => {
        if (clientData && clientData.length > 0) {
            const firstClient = clientData[0];
            console.log(firstClient);
            console.log(firstClient.projects);
            document.getElementById("clientName").value = firstClient.client_name;
            document.getElementById("sdmName").value = firstClient.client_sdm_name;
            document.getElementById("sdmEmail").value = firstClient.client_sdm_email;
            if (firstClient.projects) {
                console.log(firstClient);
                console.log(firstClient.projects);
                const projectArray = firstClient.projects.filter(project => project.project_id === projectId);
                setProjectData(projectArray[0]);
                console.log(projectData);
                document.getElementById("projectId").value = projectData.project_id;
                document.getElementById("projectName").value = projectData.project_name;
                document.getElementById("projectWorkShift").value = projectData.workshift;
                document.getElementById("projectCoreTime").value = projectData.coretime;
                document.getElementById("projectStatus").value = projectData.status;
            }
        }
    }, [clientData]);


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
                    <h4>View Project</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="view-content">
                    <div className="top-content">
                        <h3>Project Details</h3>
                        <NavLink to={`/manager/manage-accounts/edit-account/${accountId}`}>
                            <button className="edit-btn">Edit</button>
                        </NavLink>
                    </div>
                    <div className="project-info">
                        <div>
                            <div>
                                <label for="projectId">Project ID</label><br/>
                                <input type="text" name="projectId" id="projectId" disabled />
                            </div>
                            <div>
                                <label for="projectName">Project Name</label><br/>
                                <input type="text" name="projectName" id="projectName" disabled />
                            </div>
                            <div>
                                <label for="clientName">Client Name</label><br/>
                                <input type="text" name="clientName" id="clientName" disabled />
                            </div>
                            <div>
                                <label for="sdmName">SDM / SDL Name</label><br/>
                                <input type="text" name="sdmName" id="sdmName" disabled />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label for="sdmEmail">SDM / SDL Email</label><br/>
                                <input type="text" name="sdmEmail" id="sdmEmail" disabled />
                            </div>
                            <div>
                                <label for="projectWorkShift">Work Shift</label><br/>
                                <input type="text" name="projectWorkShift" id="projectWorkShift" disabled />
                            </div>
                            <div>
                                <label for="projectCoreTime">Core Time</label><br/>
                                <input type="text" name="projectCoreTime" id="projectCoreTime" disabled />
                            </div>
                            <div>
                                <label for="projectStatus">Status</label><br/>
                                <input type="text" name="projectStatus" id="projectStatus" disabled />
                            </div>
                        </div>
                    </div>

                    <div className="filters-row">
                        <div>
                            <form>
                                <input type="text" name="searchProject" id="searchProject" placeholder="Enter talent" />
                                <select>
                                    <option>Role</option>
                                </select>
                                <select>
                                    <option>Sort</option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <div className="project-table">
                        <div className="project-header">
                            <h1>ID</h1>
                            <h1>Talent Name</h1>
                            <h1>Email</h1>
                            <h1>Contact No</h1>
                            <h1>Role</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProject;