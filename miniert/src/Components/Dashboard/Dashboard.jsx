import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const handleLogin = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Simple React Dashboard</h1>
      <div className="counter">
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
        <button onClick={handleLogin}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
