// src/components/Dashboard/PlannerDashboard.jsx
import React, { useState, useEffect } from 'react';
import MapView from '../Map/Map.jsx';

const PlannerDashboard = () => {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({ id: '', coordinates: [] });
  const [isAdding, setIsAdding] = useState(false);
  const [formInputs, setFormInputs] = useState({
    routeId: '',
    coordinates: ''
  });

  useEffect(() => {
    // Simulate a data fetch or use dummy data
    const dummyRoutes = [
      {
        id: 'route1',
        coordinates: [
          { lat: 28.7041, lng: 77.1025 },
          { lat: 28.7100, lng: 77.1139 },
          { lat: 28.7257, lng: 77.1267 },
          { lat: 28.6692, lng: 77.2323 }
        ]
      },
      {
        id: 'route2',
        coordinates: [
          { lat: 28.5355, lng: 77.3910 },
          { lat: 28.5670, lng: 77.3200 },
          { lat: 28.5793, lng: 77.3370 },
          { lat: 28.6139, lng: 77.2090 }
        ]
      }
      // Add other routes as needed
    ];
    
    // Simulate setting fetched data to state
    setRoutes(dummyRoutes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRoute = () => {
    const { routeId, coordinates } = formInputs;

    if (!routeId || !coordinates) {
      alert('Please provide route ID and coordinates.');
      return;
    }

    const coordinatesArray = coordinates
      .split(';') // Split the input string by ';'
      .map(coord => {
        const [lat, lng] = coord.split(',').map(Number);
        return { lat, lng };
      });

    const newRoute = {
      id: routeId,
      coordinates: coordinatesArray
    };

    setRoutes([...routes, newRoute]);
    setIsAdding(false);
    setFormInputs({ routeId: '', coordinates: '' });
  };

  return (
    <div>
      <h2>Planner Dashboard</h2>
      <button onClick={() => setIsAdding(true)}>Add New Route</button>
      {isAdding && (
        <div>
          <h3>Create New Route</h3>
          <form>
            <div>
              <label htmlFor="routeId">Route ID:</label>
              <input
                type="text"
                id="routeId"
                name="routeId"
                value={formInputs.routeId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="coordinates">Coordinates (format: lat,lng;lat,lng;...):</label>
              <textarea
                id="coordinates"
                name="coordinates"
                value={formInputs.coordinates}
                onChange={handleChange}
                rows="4"
              />
            </div>
            <button type="button" onClick={handleAddRoute}>Send Request</button>
            <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
          </form>
        </div>
      )}
      <MapView routes={routes} />
    </div>
  );
};

export default PlannerDashboard;
