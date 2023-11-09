import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login.jsx';
import Screen1 from './Components/ForgotPass/Screen1.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Screen1/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
