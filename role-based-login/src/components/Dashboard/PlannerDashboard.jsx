
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
