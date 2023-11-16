// import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const TimesheetTable = (e) => {
    e.preventDefault();
    const getData = () => {
        axios.get('http://localhost:4000/api/talents/10000/')
        .then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }

    getData();

    // Code from login (not working yet)
    // try {
    // 	const response = async () => {
    // 		await fetch('/login', {
    // 			method: 'POST',
    // 			headers: {
    // 				'Content-Type': 'application/json',
    // 			},
    // 			body: JSON.stringify({ }),
    // 		})
    // 	}
    // 	if (response.ok) {
    // 		// Retrieve data
    // 	} else {
    // 		//Make an error message.
    // 		toast.error('Failed retrieving data.', {
    // 			position: toast.POSITION.TOP_CENTER,
    // 			autoClose: 5000,
    // 			hideProgressBar: false,
    // 			closeOnClick: true,
    // 			pauseOnHover: true,
    // 			draggable: true,
    // 			progress: undefined,
    // 			theme: "light",
    // 		});
    // 	}
    // } catch (error) {
    // 	console.error("Error during retrieval of data.", error);
    // }
}

export default TimesheetTable;