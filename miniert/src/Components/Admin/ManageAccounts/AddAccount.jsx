import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Icons
import hourglass from '../../Assets/hourglass.svg';
import logicon from '../../Assets/logout.svg';
import accIcon from '../../Assets/acc-active.svg';
import talents from '../../Assets/mng-talent-inactive.svg';
import profile from '../../Assets/inactive-profile.svg'
import users from "../../Assets/users-inactive.svg";

// Files
import './addAccount.css';
import Modal from "../../Modals/Modal.jsx";

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
    const [managerList, setManagerList] = useState([]);

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

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/admin/managers/get`)
            .then((response) => {
                setManagerList(response.data);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Error retrieving list of managers. Try again later.", {
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
    }, []);

    useEffect(() => {
        const managerDropdown = document.getElementById("managerDropdown");
        managerList.forEach(manager => {
            const optionElement = document.createElement('option');
            optionElement.textContent = `${manager.first_name} ${manager.last_name}`;
            optionElement.value = manager.employee_id;
            managerDropdown.appendChild(optionElement);
        });
    }, [managerList]);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const managerIdSelected = document.getElementById("managerDropdown").value;
        const managerData = managerList.find(manager => manager.employee_id === parseInt(managerIdSelected, 10));
        const sdmId = managerData.employee_id;
        const sdmFullName = `${managerData.first_name} ${managerData.last_name}`;
        const sdmEmail = managerData.email;
        const sdmContact = managerData.contact_number;
        const clientData = {
            client_id: document.getElementById("clientID").value,
            client_name: document.getElementById("clientName").value,
            client_address: document.getElementById("clientAddress").value,
            client_sdm_id: sdmId,
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

        axios.patch(`https://cesphl-github-io-backend.vercel.app/api/managers/${managerIdSelected}`, clientData)
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
                        <span>Assign To</span><br /><select id="managerDropdown"></select><br />
                        <NavLink to="/admin/manage-accounts">
                            <button>Cancel</button>
                        </NavLink>
                        <input type="button" value="Add" class="add-btn1" onClick={handleOpenModal} />
                    </form>
                </div>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                <div>
                    <p>Add Account to Manager</p>
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