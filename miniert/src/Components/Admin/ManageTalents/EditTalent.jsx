import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Icons
import hourglass from "../../Assets/hourglass.svg"
import logicon from "../../Assets/logout.svg";
import accIcon from "../../Assets/acc-active.svg";
import talents from "../../Assets/mng-talent-inactive.svg";
import profile from "../../Assets/inactive-profile.svg";
import users from "../../Assets/users-inactive.svg";

// Files
import "./editTalent.css";
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

    const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return <p>{formattedDate}</p>;
};

const EditTalent = () => {

    // Variables for data
    const employee_id = localStorage.getItem("employee_id");
    const [talentData, setTalentData] = useState({
        employee_id: "",
        name: "",
        email: "",
        contact_number: "",
        manager_name: "",
    });

    // Variables for components
    const [showModal, setShowModal] = useState(false);

    // Variables from URL
    const currentUrl = new URL(window.location.href);
    const parts = currentUrl.pathname.split("/");
    const talentId = parts[parts.length - 1];

    // Check for account
    // To be used for security purposes to prevent url manipulation
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/admin/${employee_id}`)
            .then((response) => {
                console.log("Account found.");
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

    // Get talent data and save it to variable
    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/talents/${talentId}`)
            .then((response) => {
                setTalentData({
                    employee_id: response.data.employee_id,
                    name: `${response.data.first_name} ${response.data.last_name}`,
                    email: response.data.email,
                    contact_number: response.data.contact_number,
                    manager_name: response.data.manager_name,
                });
            })
            .catch((err) => {
                console.error("Error retrieving talent info.", err);
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
    }, [employee_id, talentId]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = async (e) => {
        console.log(talentData);
        console.log(talentData.employee_id);
        axios.patch(`https://cesphl-github-io-backend.vercel.app/api/talents/${talentData.employee_id}`, talentData)
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
            console.error("There was a problem updating the talent info.", err);
            toast.error("There was a problem updating the talent info.", {
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
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTalentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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
                    <h4>Edit Talent</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="edit-content">
                    <div>
                        <p>Employee ID</p>
                        <input
                            type="text"
                            name="employee_id"
                            value={talentData.employee_id}
                            onChange={handleChange}
                        />
                        <p>Employee Name</p>
                        <input
                            type="text"
                            name="name"
                            value={talentData.name}
                            onChange={handleChange}
                        />
                        <p>Email Address</p>
                        <input
                            type="text"
                            name="email"
                            value={talentData.email}
                            onChange={handleChange}
                        />
                        <p>Contact Number</p>
                        <input
                            type="text"
                            name="contact_number"
                            value={talentData.contact_number}
                            onChange={handleChange}
                        />
                        <p>Reporting Manager</p>
                        <input
                            type="text"
                            name="manager_name"
                            value={talentData.manager_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="button-row">
                        <NavLink to="/admin/manage-talents">
                            <button className="cancel-btn">Cancel</button>
                        </NavLink>
                        <input type="button" value="Assign" className="add-btn" onClick={handleOpenModal} />
                    </div>
                </div>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                <div>
                    <p>Edit Talent</p>
                    <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                </div>
                <p className="modal-description">Clicking yes will update the talent information in the system. Do you wish to continue?</p>
                <div>
                    <button className="btn btn-close" onClick={handleCloseModal}> Cancel</button>
                    <button className="btn btn-save" onClick={handleSave}>Yes, Save</button>
                </div>
            </Modal>
        </div>
    );
};

export default EditTalent;