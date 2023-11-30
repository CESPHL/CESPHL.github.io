import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import hourglass from "../Assets/hourglass.svg";
import logicon from "../Assets/logout.svg";
import accIcon from "../Assets/acc-active.svg";
import talents from "../Assets/mng-talent-inactive.svg";
import reports from "../Assets/report-inactive.svg";
import profile from "../Assets/inactive-profile.svg";
import view from "../Assets/view-icn.svg";
import edit from "../Assets/edit-icn.svg";
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

const ManageAccount = () => {
  const employee_id = localStorage.getItem("employee_id");
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://cesphl-github-io-backend.vercel.app/api/managers/${employee_id}`
      )
      .then((response) => {
        const data = response.data;
        setClientData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [employee_id]);

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
              <NavLink to="/manage-accounts">
                <img
                  src={accIcon}
                  alt="dashboard icon"
                  activeclassname="active"
                />
                <span>Manage Accounts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/manage-talents">
                <img src={talents} alt="clock icon" />
                <span className="inactive">Manage Talents</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports">
                {/*page is non-existent. placeholder only. change the correct directory. */}
                <img src={reports} alt="clock icon" />
                <span className="inactive">Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile-managers">
                {/*page is non-existent. placeholder only. change the correct directory. */}
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
          <h4>Manage Accounts</h4>
          <span>
            <CurrentDate />
          </span>
        </div>
        <div className="manage-content">
          <div className="search-bar">
            <form action=" ">
              <input type="text" placeholder="Search Client" />
            </form>
            <div className="client-dropdown">
              <select>
                <option>Client</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
              <select>
                <option>Sort</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
            <div className="buttons">
              <button className="upload-btn">Upload</button>
              <NavLink to="/manage-accounts/add-account">
                <button className="add-btn">Add</button>
              </NavLink>
            </div>
          </div>
          <div className="customTableContainer">
            <div className="customTableHeader">
              <h1>Client ID</h1>
              <h1>Client Name</h1>
              <h1>SDM/SDL</h1>
              <h1>SDM/SDL Email</h1>
              <h1>SDM/SDL Contact</h1>
              <h1>Actions</h1>
            </div>
            {clientData.clients ? clientData.clients.map((client) => (
              <div className="customTableContent" key={client.client_id}>
                <p>{client.client_id}</p>
                <p>{client.client_name}</p>
                <p>{client.sdm_sdl_name}</p>
                <p>{client.sdm_sdl_email}</p>
                <p>{client.sdm_sdl_contact}</p>
                <p>
                <img src={view} />
                <NavLink to="/manage-accounts/edit-account">
                  <img src={edit} />
                </NavLink>
              </p>
              </div>
            )) : (<p>Loading...</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
