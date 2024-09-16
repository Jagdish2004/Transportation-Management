// src/components/ManagerDashboard/ManagerDashboard.jsx
import React, { useState } from 'react';
import './ManagerDashboard.css';
import Map from '../Map/Map'; // Import the Map component

const ManagerDashboard = () => {
  const [routeName, setRouteName] = useState('');
  const [routes, setRoutes] = useState([]);
  const [reportData, setReportData] = useState(null);

  const handleAddRoute = () => {
    if (routeName) {
      setRoutes([...routes, routeName]);
      setRouteName('');
    }
  };

  const handleViewReports = () => {
    // Dummy data for reports
    setReportData({
      monthlySales: '$10,000',
      monthlyProfit: '$3,000',
      monthlyExpenses: '$7,000',
      monthlyRevenue: '$15,000',
    });
  };

  return (
    <div className="dashboard-container">
      <h1>Manager Dashboard</h1>
      <div className="stats-container">
        <div className="stat-item profit">
          <h3>Profit</h3>
          <p>$3,000</p>
        </div>
        <div className="stat-item sales">
          <h3>Sales</h3>
          <p>$10,000</p>
        </div>
        <div className="stat-item revenue">
          <h3>Revenue</h3>
          <p>$15,000</p>
        </div>
        <div className="stat-item expenses">
          <h3>Expenses</h3>
          <p>$7,000</p>
        </div>
      </div>
      <div className="add-route">
        <h2>Add New Route</h2>
        <input
          type="text"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          placeholder="Enter route name"
        />
        <button onClick={handleAddRoute}>Add Route</button>
        <div className="routes-list">
          <ul>
            {routes.map((route, index) => (
              <li key={index}>{route}</li>
            ))}
          </ul>
        </div>
        <div className="dummy-routes">
          <h3>DTC City Bus Routes</h3>
          <Map /> {/* Add the Map component here */}
        </div>
      </div>
      <div className="view-reports">
        <h2>View Monthly Reports</h2>
        <button onClick={handleViewReports}>Generate Report</button>
        {reportData && (
          <div className="report-data">
            <p><strong>Monthly Sales:</strong> {reportData.monthlySales}</p>
            <p><strong>Monthly Profit:</strong> {reportData.monthlyProfit}</p>
            <p><strong>Monthly Expenses:</strong> {reportData.monthlyExpenses}</p>
            <p><strong>Monthly Revenue:</strong> {reportData.monthlyRevenue}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
