import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login.jsx';
import Screen1 from './Components/ForgotPass/Screen1.jsx';
import Screen2 from './Components/ForgotPass/Screen2.jsx';
import Screen3 from './Components/ForgotPass/Screen3.jsx';
import Screen4 from './Components/ForgotPass/Screen4.jsx';
import Timesheet from './Components/Timesheet/Timesheet.jsx';
import Profile from './Components/Profile/Profile.jsx';
import ChangePass from './Components/Profile/ChangePassword.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/resetsuccess" element={<Screen4/>}/>
        <Route path="/reset-password/:token" element={<Screen3/>}/>
        <Route path="/sentemail" element={<Screen2/>}/>
        <Route path="/forgotpass" element={<Screen1/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timesheet" element={<Timesheet/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/changepass" element={<ChangePass/>}/>

      </Routes>
    </Router>
  );
  }
export default App;