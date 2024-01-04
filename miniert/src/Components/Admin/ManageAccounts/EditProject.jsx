import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Icons
import hourglass from '../../Assets/hourglass.svg';
import logicon from '../../Assets/logout.svg';
import accIcon from '../../Assets/acc-active.svg';
import talents from '../../Assets/mng-talent-inactive.svg';
import reports from '../../Assets/report-inactive.svg';
import profile from '../../Assets/inactive-profile.svg';

// Files
import Modal from "../../Modals/Modal.jsx";
import './addProject.css';

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
const EditProject = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [clientData, setClientData] = useState([]);
    const [projectData, setProjectData] = useState({});
    const currentUrl = new URL(window.location.href);
    const pathSegments = currentUrl.pathname.split('/').filter(segment => segment !== '');
    const accountIdIndex = pathSegments.indexOf('view-account') + 1;
    const accountId = pathSegments[accountIdIndex];
    const projectIdIndex = pathSegments.indexOf('edit-project') + 1;
    const projectId = pathSegments[projectIdIndex];
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}`)
            .then((response) => {
                console.log(response.data);
                console.log(accountId);
                const filteredClients = response.data.clients.filter(client => String(client.client_id) === String(accountId));
                console.log(filteredClients);
                setClientData(filteredClients.length > 0 ? filteredClients[0] : null);
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
    }, [employee_id, accountId]);

    useEffect(() => {
        console.log(clientData);
        if (clientData.client_id) {
            document.getElementById("clientID").value = clientData.client_id || "Loading...";
            document.getElementById("clientName").value = clientData.client_name || "Loading...";
            document.getElementById("clientSDMName").value = clientData.client_sdm_name || "Loading...";
            document.getElementById("clientSDMEmail").value = clientData.client_sdm_email || "Loading...";
            document.getElementById("clientSDMContact").value = clientData.client_sdm_contact || "Loading...";
            console.log(clientData);
            const projectArray = clientData.projects.filter(project => project.project_id === projectId);
            console.log(projectArray);
            console.log(projectArray[0]);
            setProjectData(projectArray[0]);
        }
    }, [clientData]);

    useEffect(() => {
        console.log(projectData);
        // Display the project data to the front end
        if (projectData && Object.keys(projectData).length > 0) {
            document.getElementById("projectId").value = projectData.project_id;
            document.getElementById("projectName").value = projectData.project_name;
            document.getElementById("projectWorkShift").value = projectData.workshift;
            document.getElementById("projectCoreTime").value = projectData.coretime;
            document.getElementById("projectStatus").value = projectData.status;
        }
    }, [projectData])

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const projectInfo = {
            project_id: document.getElementById("projectId").value,
            project_name: document.getElementById("projectName").value,
            workshift: document.getElementById("projectWorkShift").value,
            coretime: document.getElementById("projectCoreTime").value,
            status: document.getElementById("projectStatus").value
        }

        console.log(projectInfo);

        axios.patch(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}/clients/${accountId}/edit-project/${projectId}`, projectInfo)
            .then((response) => {
                console.log(response);
                toast.success("Project info updated.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                handleCloseModal();
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
    }

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
                    <h4>Edit Project</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div id="addProjectContainer">
                    <form>
                        <div className="project-details">
                            <span>Project ID</span><br /><input type="text" placeholder="Enter project ID" id="projectId" required /><br />
                            <span>Project Name</span><br /><input type="text" placeholder="Enter project name" id="projectName" required /><br />
                            <span>Work Shift</span><br /><input type="text" placeholder="Enter project workshift" id="projectWorkShift" required /><br />
                            <span>Core Time</span><br /><input type="text" placeholder="Enter project core time" id="projectCoreTime" required /><br />
                            <span>Status</span><br /><input type="text" placeholder="Enter project status" id="projectStatus" required /><br />
                        </div>
                        <div className="client-details">
                            <span>Client ID</span><br /><input type="text" id="clientID" disabled /><br />
                            <span>Client Name</span><br /><input type="text" id="clientName" disabled /><br />
                            <span>SDM / SDL</span><br /><input type="text" id="clientSDMName" disabled /><br />
                            <span>SDM / SDL Email</span><br /><input type="text" id="clientSDMEmail" disabled /><br />
                            <span>SDM / SDL Contact No.</span><br /><input type="text" id="clientSDMContact" disabled /><br />
                        </div>
                    </form>
                    <div>
                        <NavLink to={`/admin/manage-accounts/view-account/${accountId}`}>
                            <button id="cancelButton">Cancel</button>
                        </NavLink>
                        <button id="addButton" onClick={handleOpenModal}>Edit</button>
                    </div>
                </div>
                <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                    <div>
                        <p>Edit Project</p>
                        <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                    </div>
                    <p className="modal-description">Clicking yes will edit the project details in the system. Do you wish to continue?</p>
                    <div>
                        <button className="btn btn-close" onClick={handleCloseModal}> Cancel</button>
                        <button className="btn btn-save" onClick={handleSave}>Yes, Edit</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default EditProject;