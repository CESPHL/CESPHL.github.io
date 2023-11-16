import React, { useState, useEffect, Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import ModalDash from '../../Components/DashModal/Modal.jsx';
import hourglass from '../Assets/hourglass.svg';
import logicon from '../Assets/logout.svg';
import dashicn from '../Assets/dashboard-icn.svg';
import clock from '../Assets/inactive-clock.svg';
import profile from '../Assets/inactive-profile.svg';

const Stopwatch = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimeIn, setIsTimeIn] = useState(false);
  const [isTimeOutDisabled, setIsTimeOutDisabled] = useState(true);

  useEffect(() => {
    let interval;

    if (isTimeIn) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
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
  }, [isTimeIn]);

  const handleTimeIn = () => {
    setIsTimeIn(true);
    setIsTimeOutDisabled(false);
  };

  const handleTimeOut = () => {
    setIsTimeIn(false);
    setIsTimeOutDisabled(true);
  };

  return (
    <div>
      <div className="dash-timer">
        <p>
          {String(hours).padStart(2, '0')}:
          {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </p>
      </div>
      <div className="timer-btn">
        <button onClick={handleTimeIn} disabled={isTimeIn} className="timein-btn">
          Clock In
        </button>
        <button onClick={handleTimeOut} disabled={isTimeOutDisabled} className="timeout-btn">
          Clock Out
        </button>
      </div>
    </div>
  );
};

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
      <div>
      <button type="button" onClick={this.showModal}>
        Open Modal
      </button>
      {/* Pass the correct props to ModalDash */}
      <ModalDash show={this.state.show} handleClose={this.hideModal}>
        <p>Modal Content</p>
      </ModalDash>

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
                  <NavLink to="/dashboard" activeClassName="active">
                    <img src={dashicn} alt="dashboard icon" />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/forgotpass">
                    {/*placeholder directory*/}
                    <img src={clock} alt="clock icon" />
                    <span className="inactive">Timesheet</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/resetpass">
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
                <button>Log Out</button>
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
                  <Stopwatch />
                </div>
              </div>
              <div className="tracked-hours">
                <h4>TRACKED HOURS</h4>
              </div>
              <div class="tableContainer">
                <div class="tableHeader">
                  <h1>Time In</h1>
                  <h1>Time Out</h1>
                  <h1>Date</h1>
                  <h1>Day</h1>
                  <h1>Client</h1>
                  <h1>Project</h1>
                  <h1>OT Time In</h1>
                  <h1>OT Time In</h1>
                </div>
                <div class="tableContent">
                  <p>10:00</p>
                  <p>10:00</p>
                  <p>11/15/2023</p>
                  <p>Monday</p>
                  <p>Client 1</p>
                  <p>Project 1</p>
                  <p> - </p>
                  <p> - </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

export default MyDashboard;
