import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import hourglass from "../Assets/hourglass.svg";
import logicon from "../Assets/logout.svg";
import accIcon from "../Assets/acc-active.svg";
import talents from "../Assets/mng-talent-inactive.svg";
import profile from "../Assets/inactive-profile.svg";
import users from "../Assets/users-inactive.svg";
import view from "../Assets/view-icn.svg";
import edit from "../Assets/edit-icn.svg";
import deleteicon from "../Assets/trash-icon.svg";
import axios from "axios";
import "./ManageUsers.css";
import Modal from "../Modals/Modal.jsx";
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

    const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return <p>{formattedDate}</p>;
};

const ManageUsers = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToBeDeleted] = useState({});

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/admin/`)
            .then((response) => {
                const data = response.data;
                setUserData(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [employee_id]);

    const handleOpenModal = (selectedEmp, userLevel) => {
        setShowModal(true);
        setUserToBeDeleted({ employee_id: selectedEmp, user_level: userLevel });
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleDelete = () => {
        axios.delete(`https://cesphl-github-io-backend.vercel.app/api/admin/${userToDelete.employee_id}`, { data: userToDelete })
            .then((response) => {
                console.log(response);
                toast.success("User deleted successfully.", {
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
                                <img src={users} alt="users icon" activeclassname="active" />
                                <span>Manage Users</span>
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
                    <h4>Manage Users</h4>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="manage-content">
                    <div className="search-bar">
                        <form action=" ">
                            <input type="text" placeholder="Search user by name" />
                        </form>
                        <div className="buttons">
                            <button className="upload-btn">Upload</button>
                            <NavLink to="/admin/manage-users/add-user">
                                <button className="add-btn">Add</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="table-container">
                        <div className="table-header">
                            <h1>ID</h1>
                            <h1>Name</h1>
                            <h1>Email</h1>
                            <h1>Contact No.</h1>
                            <h1>User Level</h1>
                            <h1>Actions</h1>
                        </div>
                        {userData ? userData.map((user) => (
                            <div className="table-content" key={user.employee_id}>
                                <p>{user.employee_id}</p>
                                <p>{`${user.first_name} ${user.last_name}`}</p>
                                <p>{user.email}</p>
                                <p>{user.contact_number}</p>
                                <p>{user.user_level}</p>
                                <p>
                                    <NavLink to={`/admin/manage-users/view-user/${user.employee_id}`}>
                                        <img src={view} />
                                    </NavLink>
                                    <NavLink to={`/admin/manage-users/edit-user/${user.employee_id}`}>
                                        <img src={edit} />
                                    </NavLink>
                                    <button className="delete-btn" onClick={() => handleOpenModal(user.employee_id, user.user_level)}><img src={deleteicon} alt="delete" /></button>
                                </p>
                            </div>
                        )) : (<p>Loading...</p>)}
                    </div>
                </div>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                <div>
                    <p>Delete User</p>
                    <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                </div>
                <p className="modal-description">Clicking yes will remove the account from the system. Are you sure?</p>
                <div>
                    <button className="btn btn-close" onClick={handleCloseModal}> Cancel</button>
                    <button className="btn btn-save" onClick={handleDelete}>Yes, Delete</button>
                </div>
            </Modal>
        </div>
    );
};

export default ManageUsers;