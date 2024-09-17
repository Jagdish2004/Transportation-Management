import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ManagerDashboard.css';
import Map from '../Map/Map'; // Import the Map component
import RouteCreationRequest from '../RouteCreationRequest/RouteCreationRequest'; // Import the RouteCreationRequest component

const ManagerDashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate function for routing

  const [routes, setRoutes] = useState([
    {
      name: 'Route 1: City Center to Airport',
      path: [
        [28.6129, 77.2295],
        [28.6145, 77.2152],
        [28.6167, 77.2101],
        [28.6190, 77.2000],
      ],
    },
    {
      name: 'Route 2: Downtown to Suburbs',
      path: [
        [28.6150, 77.2075],
        [28.6200, 77.2200],
        [28.6250, 77.2300],
        [28.6300, 77.2400],
      ],
    },
    {
      name: 'Route 3: Metro Station to City Park',
      path: [
        [28.6450, 77.1900],
        [28.6500, 77.2000],
        [28.6550, 77.2100],
        [28.6600, 77.2200],
      ],
    },
  ]);

  const [showRequests, setShowRequests] = useState(false);
  const [routeCreationRequests, setRouteCreationRequests] = useState([
    {
      id: 1,
      routeNumber: 'Route 11',
      busStops: [
        [28.6050, 77.2150],
        [28.6100, 77.2200],
        [28.6150, 77.2250],
      ],
    },
    {
      id: 2,
      routeNumber: 'Route 12',
      busStops: [
        [28.6200, 77.2100],
        [28.6250, 77.2150],
        [28.6300, 77.2200],
      ],
    },
  ]);

  const [reportData, setReportData] = useState(null);

  // Add route to list
  const handleAddRoute = (request) => {
    const newRoute = {
      name: request.routeNumber,
      path: request.busStops,
    };
    setRoutes([...routes, newRoute]);
    setRouteCreationRequests(routeCreationRequests.filter(req => req.id !== request.id));
  };

  // Decline request handler
  const handleDeclineRequest = (request) => {
    setRouteCreationRequests(routeCreationRequests.filter(req => req.id !== request.id));
  };

  // Handle reports viewing
  const handleViewReports = () => {
    setReportData({
      totalRoutes: routes.length,
      totalRequests: routeCreationRequests.length,
      monthlySales: '$10,000',
      monthlyProfit: '$3,000',
      monthlyExpenses: '$7,000',
      monthlyRevenue: '$15,000',
    });
  };

  // Handle logout function to redirect to login page
  const handleLogout = () => {
    // Clear session or authentication tokens (if applicable)
    // Then redirect to the login page ("/")
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>Manager Dashboard</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="stats-container">
        <div className="stat-item profit">
          <h3>Monthly Profit</h3>
          <p>$3,000</p>
        </div>
        <div className="stat-item revenue">
          <h3>Monthly Revenue</h3>
          <p>$15,000</p>
        </div>
        <div className="stat-item expenses">
          <h3>Monthly Expenses</h3>
          <p>$7,000</p>
        </div>
      </div>
      <div className="route-management">
        <h2>Route Management</h2>
        <button onClick={() => setShowRequests(!showRequests)}>
          {showRequests ? 'Hide Route Creation Requests' : 'Show Route Creation Requests'}
        </button>
        {showRequests && (
          <RouteCreationRequest
            requests={routeCreationRequests}
            onApprove={handleAddRoute}
            onDecline={handleDeclineRequest}
          />
        )}
        <div className="routes-list">
          <h3>Total Routes: {routes.length}</h3>
          <Map routes={routes} />
        </div>
      </div>
      <div className="view-reports">
        <h2>View Monthly Reports</h2>
        <button onClick={handleViewReports}>Generate Report</button>
        {reportData && (
          <div className="report-data">
            <p><strong>Total Routes:</strong> {reportData.totalRoutes}</p>
            <p><strong>Total Route Creation Requests:</strong> {reportData.totalRequests}</p>
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
