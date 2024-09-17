
// src/components/PlannerDashboard/PlannerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Map from '../Map/PlannerMap.jsx'; // Update the import to use the Map component
import './PlannerDashboard.css'; // Import the CSS file


const PlannerDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState(null); // Track only the newly created route
  const [isAdding, setIsAdding] = useState(false);
  const [formInputs, setFormInputs] = useState({
    routeId: '',
    destination: '',
    lat: '',
    lng: ''
  });
  const [routePoints, setRoutePoints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [showPopup, setShowPopup] = useState(false); // State for the temporary popup

  useEffect(() => {
    // Simulate a data fetch or use dummy data
    const dummyRoutes = [
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
    ];

    setRoutes(dummyRoutes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPoint = () => {
    const { destination, lat, lng } = formInputs;

    if (!destination || !lat || !lng) {
      alert('Please provide valid destination, latitude, and longitude.');
      return;
    }

    setRoutePoints([...routePoints, { destination, lat: Number(lat), lng: Number(lng) }]);
    setFormInputs((prev) => ({ ...prev, destination: '', lat: '', lng: '' }));
  };

  const handleAddRoute = () => {
    const { routeId } = formInputs;

    if (!routeId || routePoints.length === 0) {
      alert('Please provide a route ID and at least one point.');
      return;
    }

    const newRoute = {
      id: routeId,
      coordinates: routePoints
    };

    setRoutes([...routes, newRoute]);
    setNewRoute(newRoute); // Track the newly created route

    setIsAdding(false);
    setFormInputs({ routeId: '', destination: '', lat: '', lng: '' });
    setRoutePoints([]);
  };

  const handleSendRequest = () => {
    // Handle sending the request to the manager here
    // For now, we'll just close the modal and show the popup
    setIsModalOpen(false);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Show the popup for 2 seconds
    setNewRoute(null); // Clear new route after sending request
  };

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing auth tokens)
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1 className="header">Planner Dashboard</h1>

      {/* Show the count of existing routes */}
      <h3 className="count-info">Existing Routes Count: {routes.length}</h3>

      {/* Button to start adding a new route */}
      <button className="add-route-button" onClick={() => setIsAdding(true)}>Add New Route</button>

      {isAdding && (
        <div className="form-container">
          <h3>Create New Route</h3>
          <form>
            <div className="form-group">
              <label htmlFor="routeId">Route ID:</label>
              <input
                type="text"
                id="routeId"
                name="routeId"
                value={formInputs.routeId}
                onChange={handleChange}
              />
            </div>

            <h4>Add Route Points</h4>
            <div className="form-group">
              <label htmlFor="destination">Destination:</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formInputs.destination}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lat">Latitude:</label>
              <input
                type="text"
                id="lat"
                name="lat"
                value={formInputs.lat}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lng">Longitude:</label>
              <input
                type="text"
                id="lng"
                name="lng"
                value={formInputs.lng}
                onChange={handleChange}
              />
            </div>
            <button type="button" className="add-point-button" onClick={handleAddPoint}>Add Point</button>
            <button type="button" className="save-route-button" onClick={handleAddRoute}>Save Route</button>
            <button type="button" className="cancel-button" onClick={() => setIsAdding(false)}>Cancel</button>

            {routePoints.length > 0 && (
              <ul className="route-points-list">
                {routePoints.map((point, index) => (
                  <li key={index}>{point.destination} (Lat: {point.lat}, Lng: {point.lng})</li>
                ))}
              </ul>
            )}
          </form>
        </div>
      )}

      {/* Show the "Send Request to Manager" button only when a new route is created */}
      {newRoute && !isAdding && (
        <div className="request-container">
          <h4>New Route Created: {newRoute.id}</h4>
          <button className="send-request-button" onClick={() => setIsModalOpen(true)}>Send Request to Manager</button>
        </div>
      )}

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal">
          <h4>Confirmation</h4>
          <p>Are you sure you want to send the route request?</p>
          <button onClick={handleSendRequest}>Yes</button>
          <button onClick={() => setIsModalOpen(false)}>No</button>
        </div>
      )}

      {/* Temporary Popup */}
      {showPopup && (
        <div className="popup">Route request sent successfully!</div>
      )}

      {/* Map Component to show routes */}
      <div className="map-container">
        <Map routes={routes} newRoute={newRoute} />
      </div>
    </div>
  );
};

export default PlannerDashboard;
