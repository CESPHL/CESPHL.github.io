import React, { useState, useEffect, Component } from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";
import ModalDash from "../../Components/DashModal/Modal.jsx";
import hourglass from "../Assets/hourglass.svg";
import logicon from "../Assets/logout.svg";
import dashicn from "../Assets/dashboard-icn.svg";
import clock from "../Assets/inactive-clock.svg";
import profile from "../Assets/inactive-profile.svg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Variables for buttons
let isClockInDisabled =
  JSON.parse(localStorage.getItem("isClockInDisabled")) ?? false;
let isClockOutDisabled =
  JSON.parse(localStorage.getItem("isClockOutDisabled")) ?? true;
let isClockInOTDisabled =
  JSON.parse(localStorage.getItem("isClockInOTDisabled")) ?? true;
let isClockOutOTDisabled =
  JSON.parse(localStorage.getItem("isClockOutOTDisabled")) ?? true;

console.log("isClockInDisabled: " + isClockInDisabled);
console.log("isClockOutDisabled: " + isClockOutDisabled);
console.log("isClockInOTDisabled: " + isClockInOTDisabled);
console.log("isClockOutOTDisabled: " + isClockOutOTDisabled);

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

const Stopwatch = () => {
  // Variables for data
  const [talentData, setTalentData] = useState([]);
  const employee_id = localStorage.getItem("employee_id");
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentTime = new Date();
  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  const formattedTime = currentTime.toLocaleTimeString("en-US", options);
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = weekDay[currentTime.getDay()];
  const [hours, setHours] = useState(
    parseInt(localStorage.getItem("hours")) || 0
  );
  const [minutes, setMinutes] = useState(
    parseInt(localStorage.getItem("minutes")) || 0
  );
  const [seconds, setSeconds] = useState(
    parseInt(localStorage.getItem("seconds")) || 0
  );

  // Variables for modals
  const [isTimeInModalVisible, setIsTimeInModalVisible] = useState(false);
  const [isTimeOutModalVisible, setIsTimeOutModalVisible] = useState(false);

  useEffect(() => {
    let interval;
    localStorage.setItem("hours", hours);
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);
    if (isClockOutDisabled === false) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            // If seconds reach 59, reset to 0 and update minutes
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                // If minutes reach 59, reset to 0 and update hours
                setHours((prevHours) => prevHours + 1);
                return 0;
              } else {
                return prevMinutes + 1;
              }
            });
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [hours, minutes, seconds]);

  useEffect(() => {
    axios
      .get(
        `https://cesphl-github-io-backend.vercel.app/api/talents/${employee_id}`
      )
      .then((response) => {
        // Assuming the response is an array of objects
        const data = response.data;
        // Set the data in your component state
        setTalentData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [employee_id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Opening and closing of the time in modal
  const openTimeInModal = () => {
    setIsTimeInModalVisible(true);
  };
  const closeTimeInModal = () => {
    setIsTimeInModalVisible(false);
  };

  // Opening and closing of the time out modal
  const openTimeOutModal = () => {
    setIsTimeOutModalVisible(true);
  };

  const closeTimeOutModal = () => {
    setIsTimeOutModalVisible(false);
  };

  // Get the user input from the modal then pass it to the api
  // If successful
  // Enable the time out button
  // Disable the time in button
  // Set the isTimedIn at the localStorage to true
  // Save to database
  // Close modal
  // Start stopwatch
  const HandleTimeIn = () => {
    const projectName = document.getElementById("projectDropdown");
    const selectedProject = projectName.options[projectName.selectedIndex].text;
    const timeInData = {
      time_in: formattedTime,
      date: formattedDate,
      day: currentDay,
      project_name: selectedProject,
      client_name: document.getElementById("clientName").value,
    };

    axios
      .patch(
        `https://cesphl-github-io-backend.vercel.app/api/talents/${employee_id}/timein`,
        timeInData
      )
      .then((res) => {
        if (res.status === 200) {
          isClockInDisabled = true;
          isClockOutDisabled = false;
          isClockInOTDisabled = true;
          isClockOutOTDisabled = true;
          localStorage.setItem("isClockInDisabled", isClockInDisabled); // Used in disabling the buttons when refreshing the page
          localStorage.setItem("isClockOutDisabled", isClockOutDisabled); // Used in disabling the buttons when refreshing the page
          localStorage.setItem("isClockInOTDisabled", isClockInOTDisabled); // Used in disabling the buttons when refreshing the page
          localStorage.setItem("isClockOutOTDisabled", isClockOutOTDisabled); // Used in disabling the buttons when refreshing the page
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          localStorage.setItem("hours", 0);
          localStorage.setItem("minutes", 0);
          localStorage.setItem("seconds", 0);
          closeTimeInModal();
        } else {
          toast.error("There was trouble timing in.", {
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
      })
      .catch((err) => {
        console.error(err);
        toast.error("There was trouble timing in.", {
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
  };

  // Get the current time and date and pass it to the api
  // If successful
  // Enable the OT time in button
  // Disable the time out button
  // Change the stored isTimedIn value at the localStorage
  // Save to database
  // Close the modal
  // Stop stopwatch
  // If unsuccessful, display an error toast
  const handleTimeOut = () => {
    const projectName = document.getElementById("projectDropdown");
    const selectedProject = projectName.options[projectName.selectedIndex].text;
    const timeOutData = {
      time_out: formattedTime,
      date: formattedDate,
      day: currentDay,
      project_name: selectedProject,
      client_name: document.getElementById("clientName").value,
    };

    console.log(timeOutData);
    axios
      .patch(
        `https://cesphl-github-io-backend.vercel.app/api/talents/${employee_id}/timeout`,
        timeOutData
      )
      .then((res) => {
        if (res.status === 200) {
          isClockInDisabled = false;
          isClockOutDisabled = true;
          isClockInOTDisabled = false;
          isClockOutOTDisabled = true;
          localStorage.setItem("isClockInDisabled", isClockInDisabled); // Used in disabling the buttons when refreshing the page
          localStorage.setItem("isClockOutDisabled", isClockOutDisabled); // Used in disabling the buttons when refreshing the page
          localStorage.setItem("isClockInOTDisabled", isClockInOTDisabled); // Used in disabling the buttons when refreshing the page
          localStorage.setItem("isClockOutOTDisabled", isClockOutOTDisabled); // Used in disabling the buttons when refreshing the page
          /*Create a localStorage object that will store the hours, minutes, seconds or just concatenate all of them together 
					ex. 9:36:23, or another option just store the Hours
					*/
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          localStorage.setItem("hours", 0);
          localStorage.setItem("minutes", 0);
          localStorage.setItem("seconds", 0);
          closeTimeOutModal();
        } else {
          toast.error("There was trouble timing out.", {
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
      })
      .catch((err) => {
        console.error(err);
        toast.error("There was trouble timing in.", {
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
  };

  return (
    <div>
      <div className="dash-timer">
        <p id="hours">{String(hours).padStart(2, "0")}:</p>
        <p id="minutes">{String(minutes).padStart(2, "0")}:</p>
        <p id="seconds">{String(seconds).padStart(2, "0")}</p>
      </div>
      <div className="timer-btn">
        <button
          onClick={openTimeInModal}
          disabled={isClockInDisabled}
          className="timein-btn"
        >
          Clock In
        </button>
        <button
          onClick={openTimeOutModal}
          disabled={isClockOutDisabled}
          className="timeout-btn"
        >
          Clock Out
        </button>
      </div>
      <ModalDash
        id="timeInModal"
        show={isTimeInModalVisible}
        handleClose={closeTimeInModal}
        handleSave={HandleTimeIn}
      >
        <div className="modal-content">
          <p>Confirm Clock In</p>
        </div>
        <input
          type="text"
          id="talentName"
          name="name"
          disabled="disabled"
          value={talentData.first_name + " " + talentData.last_name}
        />
        <br />
        <input
          type="text"
          id="timeIn"
          name="date-time"
          disabled="disabled"
          value={formattedDate + " | " + formattedTime}
        />
        <br />
        <input
          type="text"
          id="clientName"
          name="client"
          disabled="disabled"
          value="GCash"
        />
        <select id="projectDropdown">
          <option defaultValue disabled>
            {" "}
            Select a Project
          </option>
          <option>GCash-Mynt</option>
          <option>Project Name</option>
        </select>
      </ModalDash>
      <ModalDash
        id="timeOutModal"
        show={isTimeOutModalVisible}
        handleClose={closeTimeOutModal}
        handleSave={handleTimeOut}
      >
        <div className="modal-content">
          <p>Confirm Clock Out</p>
        </div>
        <input
          type="text"
          id="talentName"
          name="name"
          disabled="disabled"
          value={talentData.first_name + " " + talentData.last_name}
        />
        <br />
        <input
          type="text"
          id="timeIn"
          name="date-time"
          disabled="disabled"
          value={formattedDate + " | " + formattedTime}
        />
        <br />
        <input
          type="text"
          id="clientName"
          name="client"
          disabled="disabled"
          value="GCash"
        />
        <select id="projectDropdown">
          <option defaultValue disabled>
            {" "}
            Select a Project
          </option>
          <option>GCash-Mynt</option>
          <option>Project Name</option>
        </select>
      </ModalDash>
    </div>
  );
};

const OTStopwatch = () => {
  // Variables for data
  const [talentData, setTalentData] = useState([]);
  const employee_id = localStorage.getItem("employee_id");
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentTime = new Date();
  // console.log(isTimedInOT());
  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  const formattedTime = currentTime.toLocaleTimeString("en-US", options);
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = weekDay[currentTime.getDay()];
  const [hoursOT, setHoursOT] = useState(
    parseInt(localStorage.getItem("hoursOT")) || 0
  );
  const [minutesOT, setMinutesOT] = useState(
    parseInt(localStorage.getItem("minutesOT")) || 0
  );
  const [secondsOT, setSecondsOT] = useState(
    parseInt(localStorage.getItem("secondsOT")) || 0
  );

  // Variables for modals
  const [isTimeInOTModalVisible, setIsTimeInOTModalVisible] = useState(false);
  const [isTimeOutOTModalVisible, setIsTimeOutOTModalVisible] = useState(false);

  useEffect(() => {
    let intervalOT;
    localStorage.setItem("hoursOT", hoursOT);
    localStorage.setItem("minutesOT", minutesOT);
    localStorage.setItem("secondsOT", secondsOT);
    if (isClockOutOTDisabled === false) {
      intervalOT = setInterval(() => {
        setSecondsOT((prevSecondsOT) => {
          if (prevSecondsOT === 59) {
            // If seconds reach 59, reset to 0 and update minutes
            setMinutesOT((prevMinutesOT) => {
              if (prevMinutesOT === 59) {
                // If minutes reach 59, reset to 0 and update hours
                setHoursOT((prevHoursOT) => prevHoursOT + 1);
                return 0;
              } else {
                return prevMinutesOT + 1;
              }
            });
            return 0;
          } else {
            return prevSecondsOT + 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalOT);
    }

    return () => {
      clearInterval(intervalOT);
    };
  }, [hoursOT, minutesOT, secondsOT]);

  useEffect(() => {
    axios
      .get(`https://cesphl-github-io-backend.vercel.app/api/talents/${employee_id}`)
      .then((response) => {
        // Assuming the response is an array of objects
        const data = response.data;
        // Set the data in your component state
        setTalentData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [employee_id]);

  useEffect(() => {
    const intervalIdOT = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalIdOT);
  }, []);

  // console.log("Hours: " + hours);
  // console.log("Minutes: " + minutes);
  // console.log("Seconds: " + seconds);

  // localStorage.setItem("hours", hours);
  // localStorage.setItem("minutes", minutes);
  // localStorage.setItem("seconds", seconds);

  // Opening and closing of the time in modal
  const openTimeInOTModal = () => {
    setIsTimeInOTModalVisible(true);
  };
  const closeTimeInOTModal = () => {
    setIsTimeInOTModalVisible(false);
  };

  // Opening and closing of the time out modal
  const openTimeOutOTModal = () => {
    setIsTimeOutOTModalVisible(true);
  };

  const closeTimeOutOTModal = () => {
    setIsTimeOutOTModalVisible(false);
  };

  // Get the user input from the modal then pass it to the api
  // If successful
  // Enable the time out button
  // Disable the time in button
  // Set the isTimedIn at the localStorage to true
  // Save to database
  // Close modal
  // Start stopwatch
  const HandleTimeInOT = () => {
    const projectName = document.getElementById("projectDropdown");
    const selectedProject = projectName.options[projectName.selectedIndex].text;
    const timeInData = {
      date: formattedDate,
      day: currentDay,
      client_name: document.getElementById("clientName").value,
      project_name: selectedProject,
      ot_time_in: formattedTime,
    };

    axios
      .patch(
        `https://cesphl-github-io-backend.vercel.app/api/talents/${employee_id}/timeinOT`,
        timeInData
      )
      .then((res) => {
        if (res.status === 200) {
          isClockInDisabled = true;
          isClockOutDisabled = true;
          isClockInOTDisabled = true;
          isClockOutOTDisabled = false;
          localStorage.setItem("isClockInDisabled", isClockInDisabled); // Used in disabling the buttons
          localStorage.setItem("isClockOutDisabled", isClockOutDisabled); // Used in disabling the buttons
          localStorage.setItem("isClockInOTDisabled", isClockInOTDisabled); // Used in disabling the buttons
          localStorage.setItem("isClockOutOTDisabled", isClockOutOTDisabled); // Used in disabling the buttons
          /*Create a localStorage object that will store the hours, minutes, seconds or just concatenate all of them together 
					ex. 9:36:23, or another option just store the Hours
					*/
          setHoursOT(0);
          setMinutesOT(0);
          setSecondsOT(0);
          localStorage.setItem("hoursOT", 0);
          localStorage.setItem("minutesOT", 0);
          localStorage.setItem("secondsOT", 0);
          closeTimeInOTModal();
        } else {
          toast.error("There was trouble timing in.", {
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
      })
      .catch((err) => {
        console.log(err);
        toast.error(err, {
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
  };

  // Get the current time and date and pass it to the api
  // If successful
  // Enable the OT time in button
  // Disable the time out button
  // Change the stored isTimedIn value at the localStorage
  // Save to database
  // Close the modal
  // Stop stopwatch
  // If unsuccessful, display an error toast
  const HandleTimeOutOT = () => {
    const projectName = document.getElementById("projectDropdown");
    const selectedProject = projectName.options[projectName.selectedIndex].text;
    const timeOutData = {
      date: formattedDate,
      day: currentDay,
      client_name: document.getElementById("clientName").value,
      project_name: selectedProject,
      ot_time_out: formattedTime,
    };
    console.log(timeOutData);
    axios
      .patch(
        `https://cesphl-github-io-backend.vercel.app/api/talents/${employee_id}/timeoutOT`,
        timeOutData
      )
      .then((res) => {
        if (res.status === 200) {
          isClockInDisabled = false;
          isClockOutDisabled = true;
          isClockInOTDisabled = true;
          isClockOutOTDisabled = true;
          localStorage.setItem("isClockInDisabled", isClockInDisabled); // Used in disabling the buttons
          localStorage.setItem("isClockOutDisabled", isClockOutDisabled); // Used in disabling the buttons
          localStorage.setItem("isClockInOTDisabled", isClockInOTDisabled); // Used in disabling the buttons
          localStorage.setItem("isClockOutOTDisabled", isClockOutOTDisabled); // Used in disabling the buttons
          setHoursOT(0);
          setMinutesOT(0);
          setSecondsOT(0);
          localStorage.setItem("hoursOT", 0);
          localStorage.setItem("minutesOT", 0);
          localStorage.setItem("secondsOT", 0);
          closeTimeOutOTModal();
        } else {
          toast.error("There was trouble timing out.", {
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
      })
      .catch((err) => {
        console.log(err);
        toast.error(err, {
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
  };

  return (
    <div id="OTGridItem">
      <div className="dash-timer">
        <p id="hours">{String(hoursOT).padStart(2, "0")}:</p>
        <p id="minutes">{String(minutesOT).padStart(2, "0")}:</p>
        <p id="seconds">{String(secondsOT).padStart(2, "0")}</p>
      </div>
      <div className="timer-btn">
        <button
          onClick={openTimeInOTModal}
          disabled={isClockInOTDisabled}
          className="timein-btn"
        >
          Clock In
        </button>
        <button
          onClick={openTimeOutOTModal}
          disabled={isClockOutOTDisabled}
          className="timeout-btn"
        >
          Clock Out
        </button>
      </div>
      <ModalDash
        id="timeInModal"
        show={isTimeInOTModalVisible}
        handleClose={closeTimeInOTModal}
        handleSave={HandleTimeInOT}
      >
        <div className="modal-content">
          <p>Confirm Clock In (Overtime)</p>
        </div>
        <input
          type="text"
          id="talentName"
          name="name"
          disabled="disabled"
          value={talentData.first_name + " " + talentData.last_name}
        />
        <br />
        <input
          type="text"
          id="timeIn"
          name="date-time"
          disabled="disabled"
          value={formattedDate + " | " + formattedTime}
        />
        <br />
        <input
          type="text"
          id="clientName"
          name="client"
          disabled="disabled"
          value="GCash"
        />
        <select id="projectDropdown">
          <option defaultValue disabled>
            {" "}
            Select a Project
          </option>
          <option>GCash-Mynt</option>
          <option>Project Name</option>
        </select>
      </ModalDash>
      <ModalDash
        id="timeOutModal"
        show={isTimeOutOTModalVisible}
        handleClose={closeTimeOutOTModal}
        handleSave={HandleTimeOutOT}
      >
        <div className="modal-content">
          <p>Confirm Clock Out (Overtime)</p>
        </div>
        <input
          type="text"
          id="talentName"
          name="name"
          disabled="disabled"
          value={talentData.first_name + " " + talentData.last_name}
        />
        <br />
        <input
          type="text"
          id="timeIn"
          name="date-time"
          disabled="disabled"
          value={formattedDate + " | " + formattedTime}
        />
        <br />
        <input
          type="text"
          id="clientName"
          name="client"
          disabled="disabled"
          value="GCash"
        />
        <select id="projectDropdown">
          <option defaultValue disabled>
            {" "}
            Select a Project
          </option>
          <option>GCash-Mynt</option>
          <option>Project Name</option>
        </select>
      </ModalDash>
    </div>
  );
};

const DashboardTimesheetTable = () => {
  const employee_id = localStorage.getItem("employee_id");
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentWeekData, setCurrentWeekData] = useState([]);
  const [dataWithDummy, setDataWithDummy] = useState([]);

  // Get all data from database
  useEffect(() => {
    axios
      .get(`https://cesphl-github-io-backend.vercel.app/api/talents/${employee_id}`)
      .then((response) => {
        setAttendanceData(response.data.attendance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [employee_id]);

  // Filter data to only show the current week
  useEffect(() => {
    const currentDate = new Date(); // Current date
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the start of the week (Sunday)

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Set to the end of the week (Saturday)

    const filteredData = attendanceData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfWeek && entryDate <= endOfWeek;
    });

    setCurrentWeekData(filteredData);
  }, [attendanceData]);

  // Once data is filtered, add dummy data with day
  useEffect(() => {
    const generateMissingDays = (startDate, endDate) => {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const missingDays = [];

      for (
        let dateObj = new Date(startDateObj);
        dateObj <= endDateObj;
        dateObj.setDate(dateObj.getDate() + 1)
      ) {
        const dayOfWeek = daysOfWeek[dateObj.getDay()];
        if (
          !currentWeekData ||
          !currentWeekData.find((entry) => entry.day === dayOfWeek)
        ) {
          missingDays.push({
            date: dateObj.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            day: dayOfWeek,
            _id: `dummy_${missingDays.length + 1}`,
          });
        }
      }

      return missingDays;
    };

    // Calculate the current week's start and end dates dynamically
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the start of the week (Sunday)

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Set to the end of the week (Saturday)

    // Filter data to only show the current week
    const filteredData = attendanceData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfWeek && entryDate <= endOfWeek;
    });

    // Generate missing days
    const missingDays = generateMissingDays(startOfWeek, endOfWeek);

    // Combine filtered data and missing days
    const combinedData = [...filteredData, ...missingDays];

    // Use the state-setting function to update dataWithDummy
    setDataWithDummy(combinedData);
  }, [attendanceData, currentWeekData, setDataWithDummy]);

  return (
    <div className="tableContainer">
      <div className="tableHeader">
        <h1>Time In</h1>
        <h1>Time Out</h1>
        <h1>Date</h1>
        <h1>Day</h1>
        <h1>Client</h1>
        <h1>Project</h1>
        <h1>OT Time In</h1>
        <h1>OT Time Out</h1>
      </div>
      <div className="tableContent">
        {dataWithDummy &&
          dataWithDummy.map((attendance) => (
            <div
              key={attendance._id}
              className={`${attendance.day}dashboard tableContentContainer`}
            >
              <p>{attendance.time_in || "---"}</p>
              <p>{attendance.time_out || "---"}</p>
              <p>{attendance.date || "---"}</p>
              <p>{attendance.day || "---"}</p>
              <p>{attendance.client_name || "---"}</p>
              <p>{attendance.project_name || "---"}</p>
              <p>{attendance.ot_time_in || "---"}</p>
              <p>{attendance.ot_time_out || "---"}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("employee_id");
  localStorage.removeItem("user_level");
};

class MyDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
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
              <span style={{}}>Collabera Digital</span>
              <br />
              External Resource Timesheet
            </span>
          </div>
          <div className="dash-list">
            <p>NAVIGATION</p>
            <div className="dash-1">
              <li>
                <NavLink to="/dashboard" activeclassname="active">
                  <img src={dashicn} alt="dashboard icon" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/timesheet">
                  {/*placeholder directory*/}
                  <img src={clock} alt="clock icon" />
                  <span className="inactive">Timesheet</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  {/*placeholder directory*/}
                  <img src={profile} alt="profile icon" />
                  <span className="inactive">Profile</span>
                </NavLink>
              </li>
            </div>
          </div>
          <div className="logout-btn">
            <img src={logicon} alt="logout icon" />
            <NavLink to="/">
              <button onClick={handleLogout}>Log Out</button>
            </NavLink>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="dash-text">
            <h5>Dashboard</h5>
            <span>
              <CurrentDate />
            </span>
          </div>
          <div className="dashboard-main-content">
            <div className="grid-container">
              <div className="grid-item">
                <span>Regular Shift</span>
                <Stopwatch />
              </div>
              <div className="grid-item">
                <span>Overtime</span>
                <OTStopwatch />
              </div>
            </div>
            <div className="tracked-hours">
              <h4>TRACKED HOURS</h4>
            </div>
            <DashboardTimesheetTable />
          </div>
        </div>
      </div>
    );
  }
}

export default MyDashboard;
