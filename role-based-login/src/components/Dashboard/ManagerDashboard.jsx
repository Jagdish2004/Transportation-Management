
// src/components/ManagerDashboard/ManagerDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerDashboard.css';
import Map from '../Map/PlannerMap'; // Import the PlannerMap component for visualization
import RouteCreationRequest from '../RouteCreationRequest/RouteCreationRequest';
//import Navbar from '../../Navbar/Navbar'; // Import Navbar for consistent layout

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const [routes, setRoutes] = useState([
    {
      id: 'route1',
      coordinates: [
        { destination: 'Govind Puri Metro Station', lat: 28.5355, lng: 77.2698 },
        { destination: 'AIIMS', lat: 28.5665, lng: 77.2100 },
        { destination: 'Karol Bagh', lat: 28.6538, lng: 77.1913 },
        { destination: 'Shahbad Dairy', lat: 28.7301, lng: 77.1121 }
      ]
    },
    {
      id: 'route2',
      coordinates: [
        { destination: 'Anand Vihar ISBT', lat: 28.6457, lng: 77.3152 },
        { destination: 'Karkardooma Court', lat: 28.6467, lng: 77.2931 },
        { destination: 'Indraprastha Metro Station', lat: 28.6285, lng: 77.2459 },
        { destination: 'Red Fort', lat: 28.6562, lng: 77.2410 },
        { destination: 'Mori Gate Terminal', lat: 28.6685, lng: 77.2234 }
      ]
    },
    {
      id: 'route3',
      coordinates: [
        { destination: 'Mehrauli', lat: 28.5275, lng: 77.1866 },
        { destination: 'Saket Metro Station', lat: 28.5224, lng: 77.2052 },
        { destination: 'Hauz Khas', lat: 28.5494, lng: 77.2012 },
        { destination: 'Nehru Place Terminal', lat: 28.5479, lng: 77.2537 }
      ]
    }
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

  const handleAddRoute = (request) => {
    const newRoute = {
      id: request.routeNumber,
      coordinates: request.busStops.map(([lat, lng], index) => ({
        destination: `Stop ${index + 1}`,
        lat,
        lng
      })),
    };
    setRoutes([...routes, newRoute]);
    setRouteCreationRequests(routeCreationRequests.filter(req => req.id !== request.id));
  };

  const handleDeclineRequest = (request) => {
    setRouteCreationRequests(routeCreationRequests.filter(req => req.id !== request.id));
  };

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

  const handleLogout = () => {
    // Clear session or authentication tokens (if applicable)
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      {/* <Navbar /> Include Navbar for navigation consistency */}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1 className="header">Manager Dashboard</h1>

      {/* Route Management */}
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
        <h3>Total Routes: {routes.length}</h3>
        <div className="map-container">
          <Map routes={routes} />
        </div>
      </div>

      {/* View Reports */}
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