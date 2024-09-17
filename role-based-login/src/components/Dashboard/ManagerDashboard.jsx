import React, { useState } from 'react';
import './ManagerDashboard.css';
import Map from '../Map/PlannerMap'; // Import the Map component
import RouteCreationRequest from '../RouteCreationRequest/RouteCreationRequest'; // Import the RouteCreationRequest component

const ManagerDashboard = () => {
  // Initial routes, assuming you have 10 routes by default
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
    // Add more initial routes if needed
  ]);

  const [showRequests, setShowRequests] = useState(false);
  const [routeCreationRequests, setRouteCreationRequests] = useState([
    // Dummy data for route creation requests
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
    // Add more dummy requests if needed
  ]);

  const [reportData, setReportData] = useState(null);

  const handleAddRoute = (request) => {
    // Add the route from the request to the existing routes
    const newRoute = {
      name: request.routeNumber,
      path: request.busStops,
    };

    setRoutes([...routes, newRoute]);

    // Remove the request from the list
    setRouteCreationRequests(routeCreationRequests.filter(req => req.id !== request.id));
  };

  const handleDeclineRequest = (request) => {
    // Remove the request from the list
    setRouteCreationRequests(routeCreationRequests.filter(req => req.id !== request.id));
  };

  const handleViewReports = () => {
    // Dummy data for reports
    setReportData({
      totalRoutes: routes.length,
      totalRequests: routeCreationRequests.length,
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
      <div className="route-management">
        <h2>Route Management</h2>
        <button onClick={() => setShowRequests(!showRequests)}>
          {showRequests ? 'Hide Route Creation Requests' : 'Show Route Creation Requests'}
        </button>
        {showRequests && (
          <RouteCreationRequest
            requests={routeCreationRequests}
            onApprove={handleAddRoute} // Pass the function to approve and add a route
            onDecline={handleDeclineRequest} // Pass the function to decline a request
          />
        )}
        <div className="routes-list">
          <h3>Total Routes: {routes.length}</h3>
          <Map routes={routes} /> {/* Pass routes to the Map component */}
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
