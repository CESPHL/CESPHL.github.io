import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Icons
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import accIcon from '../Assets/acc-active.svg';
import talents from '../Assets/mng-talent-inactive.svg';
import profile from '../Assets/inactive-profile.svg'
import reports from "../Assets/report-inactive.svg";

// Files
import './addAccount.css';
import Modal from "../Modals/Modal.jsx";

// External functionalities
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


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
const AddAccount = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [managerData, setManagerData] = useState([]);

    // Check for account
    // To be used for security purposes to prevent url manipulation
    // In this page, this is also used to retrieve data to add manager info when adding client
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}`)
        .then((response) => {
            setManagerData(response.data);
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
            console.log(err);
            window.location.href = "/";
        });
    }, [employee_id]);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(managerData);
        const sdmFullName = `${managerData.first_name} ${managerData.last_name}`;
        const sdmEmail = managerData.email;
        const sdmContact = managerData.contact_number;
        const clientData = {
            client_id: document.getElementById("clientID").value,
            client_name: document.getElementById("clientName").value,
            client_address: document.getElementById("clientAddress").value,
            client_sdm_name: sdmFullName,
            client_sdm_email: sdmEmail,
            client_sdm_contact: sdmContact,
            client_poc_name: document.getElementById("clientPOCName").value,
            client_poc_email: document.getElementById("clientPOCEmail").value,
            projects: [{
                project_id: document.getElementById("clientProjectID").value,
                project_name: document.getElementById("clientProjectName").value,
                workshift: document.getElementById("clientProjectWorkshift").value,
                coretime: document.getElementById("clientProjectCoretime").value,
                status: document.getElementById("clientProjectStatus").value
            }]
        };

        axios.patch(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}`, clientData)
            .then((response) => {
                console.log(response);
                toast.success("Added data successfully.", {
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
        console.log(clientData);
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
                    <h4>Add Account</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="add-mainContent">
                    <form>
                        <span>Client ID</span><br /><input type="text" placeholder="Enter client ID" id="clientID" required /><br />
                        <span>Client Name</span><br /><input type="text" placeholder="Enter client name" id="clientName" required /><br />
                        <span>Location</span><br /><input type="text" placeholder="Enter client address" id="clientAddress" required /><br />
                        <span>Client POC Name</span><br /><input type="text" placeholder="Enter client POC name" id="clientPOCName" required /><br />
                        <span>Client POC Email</span><br /><input type="text" placeholder="Enter client POC email" id="clientPOCEmail" required /><br />
                        <span>Project ID</span><br /><input type="text" placeholder="Enter project ID" id="clientProjectID" required /><br />
                        <span>Project Name</span><br /><input type="text" placeholder="Enter project name" id="clientProjectName" required /><br />
                        <span>Project Workshift</span><br /><input type="text" placeholder="Enter project workshift" id="clientProjectWorkshift" required /><br />
                        <span>Project Coretime</span><br /><input type="text" placeholder="Enter project core time" id="clientProjectCoretime" required /><br />
                        <span>Project Status</span><br /><input type="text" placeholder="Enter project status" id="clientProjectStatus" required /><br />
                        <NavLink to="/manager/manage-accounts">
                            <button>Cancel</button>
                        </NavLink>
                        <input type="button" value="Add" class="add-btn1" onClick={handleOpenModal} />
                    </form>
                </div>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                <div>
                    <p>Add Account</p>
                    <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                </div>
                <p className="modal-description">Clicking yes will add the account details and its project to the system. Do you wish to continue?</p>
                <div>
                    <button className="btn btn-close" onClick={handleCloseModal}> Cancel</button>
                    <button className="btn btn-save" onClick={handleSave}>Yes, Save</button>
                </div>
            </Modal>
        </div>
    );
};

export default AddAccount;