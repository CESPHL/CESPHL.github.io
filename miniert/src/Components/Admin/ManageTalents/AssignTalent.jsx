import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Icons
import hourglass from "../../Assets/hourglass.svg"
import logicon from "../../Assets/logout.svg";
import accIcon from "../../Assets/building-inactive.svg";
import talents from "../../Assets/talents-active.svg";
import profile from "../../Assets/inactive-profile.svg";
import users from "../../Assets/users-inactive.svg";

// Files
import "./assignTalent.css";
import Modal from "../../Modals/Modal.jsx";

// External functionalities
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// For displaying current date
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

// Main content functionality
const AssignTalents = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [talentList, setTalentList] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [clientProjectList, setClientProjectList] = useState([]);
    const [selectedTalent, setSelectedTalent] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    // Variables for components
    const [showModal, setShowModal] = useState(false);

    // Check for account
    // To be used for security purposes to prevent url manipulation
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/admin/${employee_id}`)
            .then((response) => {
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

    // Get list of talents for dropdown list
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/talents/`)
            .then((response) => {
                setTalentList(response.data);
            })
            .catch((err) => {
                console.error("Error retrieving talent info", err);
                toast.error("Error retrieving talent info. Please try again later.", {
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
    }, [employee_id]);


    // Get list of clients for dropdownlist
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/admin/clients`)
            .then((response) => {
                setClientList(response.data);
            })
            .catch((err) => {
                console.error("Error retrieving talent info", err);
                toast.error("Error retrieving talent info. Please try again later.", {
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


    // To update variable based on dropdown list selection
    const handleSelectedTalent = (event) => {
        const value = Number(event.target.value);
        const selectedTalentObject = talentList.find(talent => talent.employee_id === value);
        setSelectedTalent(selectedTalentObject);
    };

    // To update variable based on dropdown list selection
    const handleSelectedClient = (event) => {
        const value = event.target.value;
        const selectedClientObject = clientList.find(client => client.client_id === value);
        setSelectedClient(selectedClientObject);
        setClientProjectList(selectedClientObject ? selectedClientObject.projects : []);
    };

    // To update variable based on dropdown list selection
    const handleSelectedProject = (event) => {
        const value = event.target.value;
        const selectedProjectObject = clientProjectList.find(project => project.project_id === value);
        setSelectedProject(selectedProjectObject);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(`Talent: ${selectedTalent.employee_id}`);
        console.log(`Client: ${selectedClient.client_id}`);
        console.log(`Client: ${selectedProject.project_id}`);
        const saveToTalent = {
            client_id: document.getElementById("clientID").value,
            client_name: document.getElementById("clientName").value,
            sdm_sdl_name: document.getElementById("clientSDMName").value,
            projects: [{
                project_id: document.getElementById("projectId").value,
                project_name: document.getElementById("projectName").value,
                workshift: document.getElementById("projectWorkShift").value,
                coretime: document.getElementById("projectCoreTime").value,
                status: document.getElementById("projectStatus").value,
                role: document.getElementById("projectRole").value
            }]
        }

        axios.patch(`https://cesphl-github-io-backend.vercel.app/api/talents/clients/${selectedTalent.employee_id}`, saveToTalent)
            .then((response) => {
                if (response.status === 200) {
                    axios.patch(`https://cesphl-github-io-backend.vercel.app/api/managers/clients/${selectedClient.client_id}/projects/${selectedProject.project_id}/assign-talent`, { employee_id: selectedTalent.employee_id })
                        .then((response) => {
                            toast.success(response.data.message, {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            setShowModal(false);
                        })
                        .catch((err) => {
                            console.error("Error assigning talent to project.", err);
                            toast.error("Error adding project to talent. Please try again later.", {
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
                } else {
                    toast.error(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
            .catch((err) => {
                console.error("Error adding project to talent.", err);
                toast.error("Error adding project to talent. Please try again later.", {
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
                    <h4>Assign Talent</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="main-content">
                    <form>
                        <div>
                            <span>Talent</span><br />
                            <select
                                id="employeeDropdown"
                                onChange={handleSelectedTalent}
                                value={selectedTalent ? selectedTalent.employee_id : ''}
                            >
                                <option value="" disabled>Select Employee</option>
                                {talentList.map(talent => (
                                    <option key={talent.employee_id} value={talent.employee_id}>
                                        {`${talent.first_name} ${talent.last_name}`}
                                    </option>
                                ))}
                            </select><br />
                            <span>Employee ID</span><br />
                            <input type="text" id="talentId" value={selectedTalent ? selectedTalent.employee_id : ""} required disabled /><br />
                            <span>Name</span><br />
                            <input type="text" id="talentName" value={selectedTalent ? `${selectedTalent.first_name} ${selectedTalent.last_name}` : ""} required disabled /><br />
                            <span>Email</span><br />
                            <input type="text" id="talentEmail" value={selectedTalent ? selectedTalent.email : ""} required disabled /><br />
                            <span>Contact No</span><br />
                            <input type="text" id="talentContactNo" value={selectedTalent ? selectedTalent.contact_number : ""} required disabled /><br />
                        </div>
                        <div>
                            <span>Client</span><br /><select
                                id="clientDropdown"
                                onChange={handleSelectedClient}
                                value={selectedClient ? selectedClient.client_id : ''}
                            >
                                <option value="" disabled>Select Client</option>
                                {clientList.map(client => (
                                    <option key={client.client_id} value={client.client_id}>
                                        {`${client.client_name}`}
                                    </option>
                                ))}
                            </select><br />
                            <span>Client ID</span><br /><input type="text" value={selectedClient ? selectedClient.client_id : ""} id="clientID" required disabled /><br />
                            <span>Client Name</span><br /><input type="text" value={selectedClient ? selectedClient.client_name : ""} id="clientName" required disabled /><br />
                            <span>SDM Name</span><br /><input type="text" value={selectedClient ? selectedClient.client_sdm_name : ""} id="clientSDMName" required disabled /><br />
                            <span>Project</span><br /><select
                                id="projectDropdown"
                                onChange={handleSelectedProject}
                                value={selectedProject ? selectedProject.project_id : ''}
                            >
                                <option value="" disabled>Select Project</option>
                                {clientProjectList.map(project => (
                                    <option key={project.project_id} value={project.project_id}>
                                        {`${project.project_name}`}
                                    </option>
                                ))}
                            </select><br />
                            <span>Project ID</span><br /><input type="text" value={selectedProject ? selectedProject.project_id : ""} id="projectId" required disabled /><br />
                            <span>Project Name</span><br /><input type="text" value={selectedProject ? selectedProject.project_name : ""} id="projectName" required disabled /><br />
                            <span>Workshift</span><br /><input type="text" value={selectedProject ? selectedProject.workshift : ""} id="projectWorkShift" required disabled /><br />
                            <span>Coretime</span><br /><input type="text" value={selectedProject ? selectedProject.coretime : ""} id="projectCoreTime" required disabled /><br />
                            <span>Status</span><br /><input type="text" value={selectedProject ? selectedProject.status : ""} id="projectStatus" required disabled /><br />
                            <span>Role</span><br /><input type="text" id="projectRole" required /><br />
                        </div>
                    </form>
                    <div className="button-row">
                        <NavLink to="/admin/manage-accounts">
                            <button className="cancel-btn">Cancel</button>
                        </NavLink>
                        <input type="button" value="Assign" className="add-btn" onClick={handleOpenModal} />
                    </div>
                </div>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                <div>
                    <p>Assign Talent</p>
                    <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                </div>
                <p className="modal-description">Clicking yes will assign the talent to the selected client and project in the system. Do you wish to continue?</p>
                <div>
                    <button className="btn btn-close" onClick={handleCloseModal}> Cancel</button>
                    <button className="btn btn-save" onClick={handleSave}>Yes, Add</button>
                </div>
            </Modal>
        </div>
    );
};

export default AssignTalents;