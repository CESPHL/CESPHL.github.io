// React imports
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Icon imports
import hourglass from "../Assets/hourglass.svg";
import logicon from "../Assets/logout.svg";
import accIcon from "../Assets/building-inactive.svg";
import talents from "../Assets/mng-talent-inactive.svg";
import profile from "../Assets/active-profile.svg";
import users from "../Assets/users-inactive.svg";

// Files
import Modal from "../Modals/Modal.jsx";

// External functionalities
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
};

const ChangePassword = () => {
    const employee_id = localStorage.getItem('employee_id');
    const [showModal, setShowModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isPasswordValid = () => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (password !== password2) {
            return false;
        }
        return passwordRegex.test(password);
    };


    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (isPasswordValid() === true) {
                const response = await fetch(`https://cesphl-github-io-backend.vercel.app/api/admin/changepass/${employee_id}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ oldPassword, password, password2 }),
                });
                if (response.ok) {
                    // If response is ok, show a toast
                    handleCloseModal();
                    toast.success('Password successfully changed.', {
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
                else {
                    toast.error(response.json(), {
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
            }
            else {
                toast.error("Error. Please make sure your password meets the requirements and your inputs for new password and confirm password matches.", {
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
        }
        catch (err) {
            console.log('Failed login');
            // Make an error message.
            toast.error('Something went wrong.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
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
                            <NavLink to="/admin/manage-talents">
                                <img src={talents} alt="clock icon" />
                                <span className="inactive">Manage Talents</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/profile">
                                <img src={profile} alt="profile icon" activeclassname="active" />
                                <span>Profile</span>
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
                    <h5>Manage Profile</h5>
                    <span>
                        <CurrentDate />
                    </span>
                </div>
                <div className="change-pass-content">
                    <h3>Change Password</h3>
                    <div className="pass-fields">
                        <label>Old Password</label> <br />
                        <input type="password" name="oldPassword" id="oldPassword" placeholder='••••••••' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /><br /><br />
                        <label>New Password</label> <br />
                        <input type="password" name="password" id="password" placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
                        <label>Confirm Password</label> <br />
                        <input type="password" name="password2" id="password2" placeholder='••••••••' value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    </div>
                </div>
                <div className="conditions">
                    <p>Must be at least 8 characters</p>
                    <p>Must contain one special character</p>
                </div>
                <NavLink to="/admin/profile">
                    <button className="cancel-btn">Cancel</button>
                </NavLink>
                <button className="pass-submitbtn" onClick={handleOpenModal}>Save</button>
                <Modal show={showModal} handleClose={handleCloseModal} handleOpen={handleOpenModal}>
                    <div>
                        <p>Change Password</p>
                        <input type="button" className="header-close-btn" value="&#10006;" onClick={handleCloseModal} />
                    </div>
                    <p className="modal-description">Clicking yes will save your new password in the system. Do you wish to continue?</p>
                    <div>
                        <button className="btn btn-close" onClick={handleCloseModal}> Cancel</button>
                        <button className="btn btn-save" onClick={handleSave}>Yes, Save</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ChangePassword;
