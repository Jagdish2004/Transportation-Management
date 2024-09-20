
// src/components/ManagerDashboard/ManagerDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerDashboard.css';
import Map from '../Map/PlannerMap'; // Import the PlannerMap component for visualization
import RouteCreationRequest from '../RouteCreationRequest/RouteCreationRequest';


const ManagerDashboard = () => {
  const navigate = useNavigate();

  const [routes, setRoutes] = useState([
    {
      id: 'route1',
      coordinates: [
        { destination: 'Wazirpur Depot', lat: 28.7011, lng: 77.1586 },
        { destination: 'Netaji Subhash Place', lat: 28.7055, lng: 77.1590 },
        { destination: 'Pitampura TV Tower', lat: 28.7063, lng: 77.1486 },
        { destination: 'Madhuban Chowk', lat: 28.7079, lng: 77.1399 },
        { destination: 'Kashmere Gate ISBT', lat: 28.6559, lng: 77.2316 },
        { destination: 'Wonders of World', lat: 28.565738, lng:77.320491 }
      ]
    },
    {
      id: 'route2',
      coordinates: [
        { destination: 'Wazirpur Depot', lat: 28.7011, lng: 77.1586 },
        { destination: 'Madhuban Chowk', lat: 28.7079, lng: 77.1399 },
        { destination: 'Shakurpur', lat: 28.7111, lng: 77.1444 },
        { destination: 'Keshav Puram', lat: 28.7267, lng: 77.1754 },
        { destination: 'Keshav Puram', lat:28.6621, lng: 77.2441},
        { destination: 'Bhajanpura', lat: 28.6683, lng: 77.2915 },
        { destination: 'Anand Vihar ISBT', lat: 28.6500, lng: 77.3090 },
      
        // Additional point
      ]
    },
    {
      id: 'route3',
      coordinates: [
        { destination: 'Wazirpur Depot', lat: 28.7011, lng: 77.1586 },
        { destination: 'Madhuban Chowk', lat: 28.7079, lng: 77.1399 },
        { destination: 'Moti Bagh', lat: 28.5877, lng: 77.1853 },
        { destination: 'Saket District Centre', lat: 28.5525, lng: 77.2270 },
        { destination: 'Qutub Minar', lat: 28.5275, lng: 77.1850 } // Additional point
      ]
    },
    {
      id: 'route4',
      coordinates: [
        { destination: 'Wazirpur Depot', lat: 28.7011, lng: 77.1586 },
        { destination: 'Shalimar Bagh', lat: 28.6961, lng: 77.1873 },
        { destination: 'Azadpur Mandi', lat: 28.6580, lng: 77.1983 },
      
        { destination: 'Connaught Place', lat: 28.6280, lng: 77.2197 }
      ]
    },
    {
      id: 'route5',
      coordinates: [
        { destination: 'Wazirpur Depot', lat: 28.7011, lng: 77.1586 },
        { destination: 'raja garden', lat: 28.651018, lng:77.126126},
       
        { destination: 'Dhaula Kuan', lat: 28.594512, lng: 77.166319},
        
        { destination: 'mahipalpur flyover', lat:28.543034, lng: 77.117613 },
        { destination: 'Gurgaon Civil Lines', lat: 28.4850, lng: 77.0772 },
        
        { destination: 'Gurgaon Sector 17', lat: 28.4675, lng: 77.0731 },
        { destination: 'Kapashera Border', lat: 28.4874, lng: 77.1185 },
        
        
     
      ]
    }

  ]);

  const [showRequests, setShowRequests] = useState(false);
  const [routeCreationRequests, setRouteCreationRequests] = useState([
    {
      id: 1,
      routeNumber: 'Route 150',
      busStops: [
        [28.6417, 77.1568],
        [28.6372, 77.1827],
        [28.6362, 77.2045],
      ],
    },
    {
      id: 2,
      routeNumber: 'Route 151',
      busStops: [
        [28.6519, 77.1906],
        [28.6315, 77.2167],
        [28.6129, 77.2295],
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