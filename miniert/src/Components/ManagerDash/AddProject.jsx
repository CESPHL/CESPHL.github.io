import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Icons
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import accIcon from '../Assets/acc-active.svg';
import talents from '../Assets/mng-talent-inactive.svg';
import reports from '../Assets/report-inactive.svg';
import profile from '../Assets/inactive-profile.svg';

// Files
import Modal from "../Modals/Modal.jsx";
import './addAccount.css';

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
const AddProject = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [clientData, setClientData] = useState([]);
    const currentUrl = new URL(window.location.href);
    const accountId = currentUrl.pathname.split('/').pop();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}`)
            .then((response) => {
                console.log(response.data);
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

    console.log(clientData);

    useEffect(() => {
        console.log(clientData);
        // if (clientData) {
        //     document.getElementById("clientID").value = clientData.client_id ? clientData.client_id : "Loading...";
        //     document.getElementById("clientName").value = clientData.client_name ? clientData.client_name : "Loading...";
        //     document.getElementById("clientLocation").value = clientData.client_address ? clientData.client_address : "Loading...";
        //     document.getElementById("clientPOCName").value = clientData.client_poc_name ? clientData.client_poc_name : "Loading...";
        //     document.getElementById("clientPOCEmail").value = clientData.client_poc_email ? clientData.client_poc_email : "Loading...";
        //     document.getElementById("clientSDMName").value = clientData.client_sdm_name ? clientData.client_sdm_name : "Loading...";
        //     document.getElementById("clientSDMEmail").value = clientData.client_sdm_email ? clientData.client_sdm_email : "Loading...";
        //     document.getElementById("clientSDMContact").value = clientData.client_sdm_contact ? clientData.client_sdm_contact : "Loading...";
        // }
    }, [clientData]);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
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
                    <h4>Add Project</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="custom-add-mainContent">
                    <form>
                        <div className="project-details">
                            <span>Project ID</span><br /><input type="text" placeholder="Enter project ID" id="clientProjectID" required /><br />
                            <span>Project Name</span><br /><input type="text" placeholder="Enter project name" id="clientProjectName" required /><br />
                            <span>Work Shift</span><br /><input type="text" placeholder="Enter project workshift" id="clientProjectWorkshift" required /><br />
                            <span>Core Time</span><br /><input type="text" placeholder="Enter project core time" id="clientProjectCoretime" required /><br />
                            <span>Status</span><br /><input type="text" placeholder="Enter project status" id="clientProjectStatus" required /><br />
                        </div>
                        <div className="client-details">
                            <span>Client ID</span><br /><input type="text" id="clientID" disabled /><br />
                            <span>Client Name</span><br /><input type="text" id="clientName" disabled /><br />
                            <span>SDM / SDL</span><br /><input type="text" id="clientSDMName" disabled /><br />
                            <span>SDM / SDL Email</span><br /><input type="text" id="clientSDMEmail" disabled /><br />
                            <span>SDM / SDL Contact No.</span><br /><input type="text" id="clientSDMContact" disabled /><br />
                        </div>
                        <NavLink to="/manager/manage-accounts">
                            <button>Cancel</button>
                        </NavLink>
                        <input type="button" value="Add" class="add-btn1" onClick={handleOpenModal} />
                    </form>
                </div>
                <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                    <div>
                        <p>Add Project</p>
                        <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                    </div>
                    <p className="modal-description">Clicking yes will add the project details in the system. Do you wish to continue?</p>
                    <div>
                        <button className="btn btn-close" onClick={handleCloseModal}> Cancel</button>
                        <button className="btn btn-save" onClick={handleSave}>Yes, Add</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default AddProject;