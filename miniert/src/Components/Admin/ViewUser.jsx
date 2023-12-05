import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import hourglass from "../Assets/hourglass.svg";
import logicon from "../Assets/logout.svg";
import accIcon from "../Assets/acc-active.svg";
import talents from "../Assets/mng-talent-inactive.svg";
import profile from "../Assets/inactive-profile.svg";
import users from "../Assets/users-inactive.svg";
import axios from "axios";
import Modal from "../Modals/Modal.jsx";
import './addUser.css';
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

const ViewUser = () => {
    const employee_id = localStorage.getItem("employee_id");
    const [userData, setUserData] = useState();
    const findEmployee = window.location.href.split("/").pop();
    console.log(findEmployee);

    useEffect(() => {
        axios.get(`https://cesphl-github-io-backend.vercel.app/api/admin/${findEmployee}`)
        .then((response) => {
            const data = response.data;
            setUserData(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [employee_id]);
    console.log(userData);
};

export default ViewUser;