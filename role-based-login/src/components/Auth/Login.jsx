import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming your CSS file is already created and styled

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!user.username || !user.password || !user.role) {
      alert('Please fill in all fields');
      return;
    }

    // Redirect based on role
    switch (user.role) {
      case 'manager':
        navigate('/manager-dashboard');
        break;
      case 'planner':
        navigate('/planner-dashboard');
        break;
      case 'scheduler':
        navigate('/scheduler-dashboard');
        break;
      case 'crew':
        navigate('/crew-dashboard');
        break;
      default:
        alert('Invalid role selected');
    }
  };

  return (
    <div className="container"> {/* Flexbox container for centering */}
      <div className="title-container">
        <h1 className="title">Transportation Management DTC</h1>
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <select name="role" value={user.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="planner">Planner</option>
          <option value="scheduler">Scheduler</option>
          <option value="crew">Crew Member</option>
        </select>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
