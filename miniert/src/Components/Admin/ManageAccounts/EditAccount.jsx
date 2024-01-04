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
import './EditAccount.css';

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
const AddAccount = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [clientData, setClientData] = useState([]);
    const currentUrl = new URL(window.location.href);
    const accountId = currentUrl.pathname.split('/').pop();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}`)
            .then((response) => {
                console.log(response.data);
                const filteredClients = response.data.clients.filter(client => client.client_id === accountId);
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
        if (clientData) {
            document.getElementById("clientID").value = clientData.client_id ? clientData.client_id : "Loading...";
            document.getElementById("clientName").value = clientData.client_name ? clientData.client_name : "Loading...";
            document.getElementById("clientLocation").value = clientData.client_address ? clientData.client_address : "Loading...";
            document.getElementById("clientPOCName").value = clientData.client_poc_name ? clientData.client_poc_name : "Loading...";
            document.getElementById("clientPOCEmail").value = clientData.client_poc_email ? clientData.client_poc_email : "Loading...";
        }
    }, [clientData]);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const clientInfo = {
            client_id: document.getElementById("clientID").value,
            client_name: document.getElementById("clientName").value,
            client_address: document.getElementById("clientLocation").value,
            client_poc_name: document.getElementById("clientPOCName").value,
            client_poc_email: document.getElementById("clientPOCEmail").value
        }

        axios.patch(`https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}/clients/${accountId}`, clientInfo)
            .then((res) => {
                console.log(res);
                toast.success("Edit client info successfully.", {
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
            })
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
                    <h4>Edit Account</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="custom-add-mainContent">
                    <h3>Account Details</h3>
                    <form>
                        <span>Client ID</span><br />
                        <textarea id="clientID" rows="1" cols="50" required></textarea><br />

                        <span>Client Name</span><br />
                        <textarea id="clientName" rows="1" cols="50" required></textarea><br />

                        <span>Location</span><br />
                        <textarea id="clientLocation" rows="4" cols="50" style={{ resize: 'none', height: '50px' }} required></textarea><br />

                        <span>Client POC Name</span><br />
                        <textarea id="clientPOCName" rows="1" cols="50" required></textarea><br />

                        <span>Client POC Email</span><br />
                        <textarea id="clientPOCEmail" rows="1" cols="50" required></textarea><br />

                        <NavLink to={`/manager/manage-accounts/view-account/${accountId}`}>
                            <button>Cancel</button>
                        </NavLink>
                        <input type="button" value="Save" className="custom-add-btn1" onClick={handleOpenModal} />
                    </form>
                </div>
                <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                    <div>
                        <p>Edit Account</p>
                        <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                    </div>
                    <p className="modal-description">Clicking yes will edit the account details in the system. Do you wish to continue?</p>
                    <div>
                        <button className="btn btn-close" onClick={handleCloseModal}> Cancel</button>
                        <button className="btn btn-save" onClick={handleSave}>Yes, Save</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default AddAccount;