import React, { useState, useEffect } from 'react';
import MapView from '../Map/PlannerMap.jsx';

const PlannerDashboard = () => {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({ id: '', coordinates: [] });
  const [isAdding, setIsAdding] = useState(false);
  const [formInputs, setFormInputs] = useState({
    routeId: '',
    destination: '',
    lat: '',
    lng: ''
  });
  const [routePoints, setRoutePoints] = useState([]);

  useEffect(() => {
    // Simulate a data fetch or use dummy data
    const dummyRoutes = [
      {
        id: 'route1',
        coordinates: [
          { destination: 'Govind Puri Metro Station', lat: 28.5355, lng: 77.2698 },
          { destination: 'Nehru Place', lat: 28.5479, lng: 77.2537 },
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
          { destination: 'AIIMS', lat: 28.5665, lng: 77.2100 },
          { destination: 'Nehru Place Terminal', lat: 28.5479, lng: 77.2537 }
        ]
      },
      {
        id: 'route4',
        coordinates: [
          { destination: 'Rohini Sector 22', lat: 28.7165, lng: 77.1140 },
          { destination: 'Pitampura', lat: 28.6963, lng: 77.1412 },
          { destination: 'Shalimar Bagh', lat: 28.6992, lng: 77.1665 },
          { destination: 'Jahangirpuri', lat: 28.7259, lng: 77.1717 },
          { destination: 'Azadpur', lat: 28.7020, lng: 77.1807 }
        ]
      },
      {
        id: 'route5',
        coordinates: [
          { destination: 'Dwarka Sector 21', lat: 28.5497, lng: 77.0483 },
          { destination: 'Palam', lat: 28.5820, lng: 77.1289 },
          { destination: 'Janakpuri', lat: 28.6120, lng: 77.1025 },
          { destination: 'Tilak Nagar', lat: 28.6391, lng: 77.0948 },
          { destination: 'Rajouri Garden', lat: 28.6539, lng: 77.1204 }
        ]
      }, {
        id: 'circularRoute2',  // Another Circular route ID
        coordinates: [
          { destination: 'Shahdara Depot', lat: 28.6735, lng: 77.2912 }, // Starting point
          { destination: 'Welcome', lat: 28.6799, lng: 77.2772 },
          { destination: 'Yamuna Vihar', lat: 28.6914, lng: 77.2689 },
          { destination: 'Bhajanpura', lat: 28.7061, lng: 77.2580 },
          { destination: 'Maujpur', lat: 28.6985, lng: 77.2583 },
          { destination: 'Seelampur', lat: 28.6755, lng: 77.2721 },
          { destination: 'Kashmere Gate', lat: 28.6692, lng: 77.2323 },
          { destination: 'Shahdara Metro Station', lat: 28.6723, lng: 77.2917 },
          { destination: 'Shahdara Depot', lat: 28.6735, lng: 77.2912 } // Ending at the same depot (Circular route)
        ]
      },
      // {
      //   id: 'circularRoute1',  // Circular route ID
      //   coordinates: [
      //     { destination: 'Shahdara Depot', lat: 28.6735, lng: 77.2912 }, // Starting point
      //     { destination: 'Seelampur', lat: 28.6755, lng: 77.2721 },
      //     { destination: 'Shastri Park', lat: 28.6747, lng: 77.2403 },
      //     { destination: 'ISBT Kashmere Gate', lat: 28.6692, lng: 77.2323 },
      //     { destination: 'Red Fort', lat: 28.6562, lng: 77.2410 },
      //     { destination: 'Chandni Chowk', lat: 28.6572, lng: 77.2301 },
      //     { destination: 'Connaught Place', lat: 28.6315, lng: 77.2167 },
      //     { destination: 'India Gate', lat: 28.6139, lng: 77.2295 },
      //     { destination: 'Pragati Maidan', lat: 28.6207, lng: 77.2482 },
      //     { destination: 'Akshardham Temple', lat: 28.6145, lng: 77.2773 },
      //     { destination: 'Preet Vihar', lat: 28.6394, lng: 77.2904 },
      //     { destination: 'Karkardooma Court', lat: 28.6467, lng: 77.2931 },
      //     { destination: 'Dilshad Garden', lat: 28.6823, lng: 77.3020 },
      //     { destination: 'GTB Hospital', lat: 28.6845, lng: 77.3091 },
      //     { destination: 'Jhilmil', lat: 28.6760, lng: 77.3085 },
      //     { destination: 'Shahdara Depot', lat: 28.6735, lng: 77.2912 } // Ending at the same depot (Circular route)
      //   ]
      // },
      
    ];
    

    setRoutes(dummyRoutes);
  }, []);

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new point (destination with lat and lng)
  const handleAddPoint = () => {
    const { destination, lat, lng } = formInputs;

    if (!destination || !lat || !lng) {
      alert('Please provide valid destination, latitude, and longitude.');
      return;
    }

    // Add the new point to the route points
    setRoutePoints([...routePoints, { destination, lat: Number(lat), lng: Number(lng) }]);

    // Reset the input fields for the next point
    setFormInputs((prev) => ({ ...prev, destination: '', lat: '', lng: '' }));
  };

  // Handle submitting the entire new route
  const handleAddRoute = () => {
    const { routeId } = formInputs;

    if (!routeId || routePoints.length === 0) {
      alert('Please provide a route ID and at least one point.');
      return;
    }

    // Create the new route object
    const newRoute = {
      id: routeId,
      coordinates: routePoints
    };

    // Add the new route to the routes list
    setRoutes([...routes, newRoute]);

    // Reset the form and points
    setIsAdding(false);
    setFormInputs({ routeId: '', destination: '', lat: '', lng: '' });
    setRoutePoints([]);
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
                style={{ width: '150px' }} // Decreased width
              />
            </div>

            <h4>Add Route Points</h4>
            <div>
              <label htmlFor="destination">Destination:</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formInputs.destination}
                onChange={handleChange}
                style={{ width: '150px' }} // Decreased width
              />
            </div>
            <div>
              <label htmlFor="lat">Latitude:</label>
              <input
                type="text"
                id="lat"
                name="lat"
                value={formInputs.lat}
                onChange={handleChange}
                style={{ width: '150px' }} // Decreased width
              />
            </div>
            <div>
              <label htmlFor="lng">Longitude:</label>
              <input
                type="text"
                id="lng"
                name="lng"
                value={formInputs.lng}
                onChange={handleChange}
                style={{ width: '150px' }} // Decreased width
              />
            </div>
            <button type="button" onClick={handleAddPoint}>Add Point</button>

            <h4>Route Points:</h4>
            <ul>
              {routePoints.map((point, index) => (
                <li key={index}>
                  {point.destination} ({point.lat}, {point.lng})
                </li>
              ))}
            </ul>

            <button type="button" onClick={handleAddRoute}>Save Route</button>
            <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
          </form>
        </div>
      )}

      <MapView routes={routes} color="blue" />
    </div>
  );
};

export default PlannerDashboard;
