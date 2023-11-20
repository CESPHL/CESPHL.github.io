import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Timesheet.css';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import dashicn from '../Assets/inactive-dash.svg';
import clock from '../Assets/active-clock.svg';
import profile from '../Assets/inactive-profile.svg';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

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
function StartDatePicker () {
    return (  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Start Date" 
        />
      </DemoContainer>
    </LocalizationProvider>  
    );
  };
  function EndDatePicker () {
    return (  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End Date" 
        />
      </DemoContainer>
    </LocalizationProvider>  
    );
  };
  const TimesheetTable = () => {
    const [attendanceData, setAttendanceData] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:4000/api/talents/10000/')
        .then(response => {
          setAttendanceData(response.data.attendance);
          response.data.attendance.forEach(attendance => {
            console.log(attendance);
          });
        }).catch(err => {
          console.log(err);
        });
    }, []);
  
    return (
      <div className="tableContainer">
        <div className="table-title">
          <h3>Weekly Timesheet</h3>
        </div>
        <div className="tableHeader">
          <h1> </h1>
          <h1>M</h1>
          <h1>T</h1>
          <h1>W</h1>
          <h1>TH</h1>
          <h1>F</h1>
          <h1>S</h1>
          <h1>S</h1>
        </div>
        <div className="tableContent">
            <div>
              <p>Clock In</p>
            </div>
            <div>
              <p>Clock Out</p>
            </div>
            <div>
              <p>OT Clock In</p>
            </div>
            <div>
              <p>OT Clock Out</p>
            </div>
            <div>
              <p>Total Hours</p>
            </div>
        </div>
      </div>
    )
  }
const Timesheet = () => {
  return (
    <div className="dashboard">
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
              <NavLink to="/dashboard">
                <img src={dashicn} alt="dashboard icon" />
                <span className="inactive">Dashboard</span>
              </NavLink>
            </li>
            <li>
            <NavLink to="/timesheet">
            <img src={clock} alt="clock icon" activeclassName="active" />
            <span>Timesheet</span>
            </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
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
          <h5>Timesheet</h5>
          <span>
            <CurrentDate />
          </span>
        </div>
        <div className="timesheet-content">
        <div className="filter">
          <StartDatePicker/>
          <EndDatePicker/>
          <div className="dropdown">
          <select>
            <option value="" disabled selected hidden>Sort</option>
            <option value="">Option 1</option>
            <option value="">Option 2</option>
          </select>
          </div>
          </div>
          <div>
          <TimesheetTable />
          </div>
          </div>
      </div>
    </div>
  );
};

export default Timesheet;
