// src/App.jsx
//leaflet for manager
// src/index.js
import 'leaflet/dist/leaflet.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';
import PlannerDashboard from './components/Dashboard/PlannerDashboard';
import SchedulerDashboard from './components/Dashboard/SchedulerDashboard';
import CrewDashboard from './components/Dashboard/CrewDashboard';
import RedesignScheduleML from './components/Dashboard/RedesignScheduleML';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/planner-dashboard" element={<PlannerDashboard />} />
        <Route path="/scheduler-dashboard" element={<SchedulerDashboard />} />
        <Route path="/crew-dashboard" element={<CrewDashboard />} />
        <Route path="/redesign-ml" element={<RedesignScheduleML />} />

      </Routes>
    </Router>
  );
};

export default App;