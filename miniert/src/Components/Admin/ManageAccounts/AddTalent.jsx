import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Icons
import hourglass from '../../Assets/hourglass.svg';
import logicon from '../../Assets/logout.svg';
import accIcon from '../../Assets/acc-active.svg';
import talents from '../../Assets/mng-talent-inactive.svg';
import users from "../../Assets/users-inactive.svg";
import profile from '../../Assets/inactive-profile.svg';

// Files
import Modal from "../../Modals/Modal.jsx";
import './addTalent.css';

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
const AddTalent = () => {
    // Variables for data
    const employee_id = localStorage.getItem("employee_id");
    const [clientData, setClientData] = useState([]);
    const [projectData, setProjectData] = useState({});
    const [talentList, setTalentList] = useState([]);
    const [selectedTalent, setSelectedTalent] = useState(null);

    // Variables for components
    const [showModal, setShowModal] = useState(false);

    // Variables from URL
    const currentUrl = new URL(window.location.href);
    const path = currentUrl.pathname;
    const parts = path.split('/');
    const manager_id = parts[3];
    const account_id = parts[5];
    const project_id = parts[7];

    // Get list of clients and filter it according to specified client id
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/managers/${manager_id}`)
            .then((response) => {
                const filteredClients = response.data.clients.filter(client => String(client.client_id) === String(account_id));
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
    }, [employee_id, account_id]);

    // Render client data and find specified project data
    useEffect(() => {
        if (clientData.client_id) {
            document.getElementById("clientID").value = clientData.client_id || "Loading...";
            document.getElementById("clientName").value = clientData.client_name || "Loading...";
            document.getElementById("clientSDMName").value = clientData.client_sdm_name || "Loading...";
            const projectArray = clientData.projects.filter(project => project.project_id === project_id);
            setProjectData(projectArray[0]);
        }
    }, [clientData]);

    // Display the project data to the front end
    useEffect(() => {
        if (projectData && Object.keys(projectData).length > 0) {
            document.getElementById("projectId").value = projectData.project_id;
            document.getElementById("projectName").value = projectData.project_name;
            document.getElementById("projectWorkShift").value = projectData.workshift;
            document.getElementById("projectCoreTime").value = projectData.coretime;
            document.getElementById("projectStatus").value = projectData.status;
        }
    }, [projectData])

    // Get list of talents for dropdown list
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

    // Put list of talents in dropdown list
    useEffect(() => {
        const talentDropdown = document.getElementById("employeeDropdown");
        talentList.forEach((talent) => {
            const optionElement = document.createElement('option');
            optionElement.textContent = `${talent.first_name} ${talent.last_name}`;
            optionElement.value = talent.employee_id;
            talentDropdown.appendChild(optionElement);
        });
    }, [talentList])

    const handleSelectedTalent = (event) => {
        const value = event.target.value;
        const selectedTalentObject = talentList.find(talent => talent.employee_id === value);
        setSelectedTalent(selectedTalentObject);
        console.log(selectedTalentObject);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const saveToTalent = {
            client_id: document.getElementById("").value,
            client_name: document.getElementById("").value,
            client_sdm_name: document.getElementById("").value,
            projects: [{
                project_id: document.getElementById("projectId").value,
                project_name: document.getElementById("projectName").value,
                workshift: document.getElementById("projectWorkShift").value,
                coretime: document.getElementById("projectCoreTime").value,
                status: document.getElementById("projectStatus").value,
                role: document.getElementById("projectRole").value
            }]
        }
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
                    <h4>Add Talent</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="add-mainContent">
                    <form>
                        <div>
                            <span>Employee</span><br />
                            <select id="employeeDropdown" onChange={handleSelectedTalent} value={selectedTalent ? selectedTalent.employee_id : ''}>
                                {talentList.map(talent => (
                                    <option key={talent.employee_id} value={talent.employee_id}>
                                        {`${talent.first_name} ${talent.last_name}`}
                                    </option>
                                ))}
                            </select><br />
                            <span>Employee ID</span><br /><input type="text" id="talentId" required disabled /><br />
                            <span>Name</span><br /><input type="text" id="talentName" required disabled /><br />
                            <span>Email</span><br /><input type="text" id="talentEmail" required disabled /><br />
                            <span>Contact No</span><br /><input type="text" id="clientPOCEmail" required disabled /><br />
                        </div>
                        <div>
                            <span>Client ID</span><br /><input type="text" id="clientID" required disabled /><br />
                            <span>Client Name</span><br /><input type="text" id="clientName" required disabled /><br />
                            <span>SDM Name</span><br /><input type="text" id="clientSDMName" required disabled /><br />
                            <span>Project ID</span><br /><input type="text" id="projectId" required disabled /><br />
                            <span>Project Name</span><br /><input type="text" id="projectName" required disabled /><br />
                            <span>Workshift</span><br /><input type="text" id="projectWorkShift" required disabled /><br />
                            <span>Coretime</span><br /><input type="text" id="projectCoreTime" required disabled /><br />
                            <span>Status</span><br /><input type="text" id="projectStatus" required disabled /><br />
                            <span>Role</span><br /><input type="text" id="projectRole" required /><br />
                        </div>
                        <NavLink to="/admin/manage-accounts">
                            <button>Cancel</button>
                        </NavLink>
                        <input type="button" value="Add" class="add-btn1" onClick={handleOpenModal} />
                    </form>
                </div>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                <div>
                    <p>Add Talent</p>
                    <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                </div>
                <p className="modal-description">Clicking yes will add the talent details in the system. Do you wish to continue?</p>
                <div>
                    <button className="btn btn-close" onClick={handleCloseModal}> Cancel</button>
                    <button className="btn btn-save" onClick={handleSave}>Yes, Add</button>
                </div>
            </Modal>
        </div>
    );
};

export default AddTalent;