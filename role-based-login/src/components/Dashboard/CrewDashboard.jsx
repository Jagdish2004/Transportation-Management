// src/components/Dashboard/CrewDashboard.jsx
import React, { useState, useEffect } from 'react';
import './CrewDashboard.css';
import io from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for map rendering

// WebSocket server for real-time notifications
const socket = io('http://localhost:5000'); 

const CrewDashboard = () => {
  const [crewId, setCrewId] = useState('C001'); // Sample crew member ID
  const [schedule, setSchedule] = useState([]);
  const [status, setStatus] = useState('Available');
  const [location, setLocation] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    // Fetch the crew member's schedule (Replace with actual API calls)
    const fetchedSchedule = [
      {
        route_no: '101',
        bus_no: 'B102',
        shift: 'Morning',
        start_time: '08:00 AM',
        end_time: '12:00 PM',
        remarks: 'Drive carefully',
        coordinates: [
          [28.5355, 77.2698], 
          [28.5665, 77.2100], 
          [28.6538, 77.1913], 
          [28.7301, 77.1121]
        ],
      }
    ];
    setSchedule(fetchedSchedule);
    setRouteCoordinates(fetchedSchedule[0].coordinates); // Set map coordinates for the route

    // Listen for real-time notifications via WebSockets
    socket.on('schedule-update', (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });
  }, [crewId]);

  const handleAbsentStatus = () => {
    setStatus('Absent');
    alert(`Marked as Absent for Crew ID: ${crewId}`);
    socket.emit('status-change', { crewId, status: 'Absent' }); // Notify the system of status change
  };

  const handlePresentStatus = () => {
    setStatus('Available');
    alert(`Marked as Available for Crew ID: ${crewId}`);
    socket.emit('status-change', { crewId, status: 'Available' });
  };

  const handleFeedbackSubmit = () => {
    alert('Feedback submitted successfully!');
    setFeedback('');
  };

  const handleLocationSend = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation([latitude, longitude]);
      socket.emit('location-update', { crewId, location: [latitude, longitude] });
      alert('Location sent to the system!');
    });
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="crew-dashboard">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h1>Crew Dashboard</h1>

      <div className="profile-section">
        <h3>Crew ID: {crewId}</h3>
        <h3>Status: {status}</h3>
        <div className="status-buttons">
          <button onClick={handlePresentStatus} className="status-button">
            Mark as Available
          </button>
          <button onClick={handleAbsentStatus} className="status-button">
            Mark as Absent
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="notifications-container">
        <h2>Notifications</h2>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))
          ) : (
            <li>No notifications at the moment</li>
          )}
        </ul>
      </div>

      {/* Schedule */}
      <div className="schedule-container">
        <h2>Your Schedule</h2>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Route No.</th>
              <th>Bus No.</th>
              <th>Shift</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index}>
                <td>{item.route_no}</td>
                <td>{item.bus_no}</td>
                <td>{item.shift}</td>
                <td>{item.start_time}</td>
                <td>{item.end_time}</td>
                <td>{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Map */}
      <div className="map-section">
        <h2>Route Map</h2>
        {routeCoordinates.length > 0 ? (
          <MapContainer
            center={routeCoordinates[0] || [28.5355, 77.2698]} // Fallback coordinates for Delhi
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {routeCoordinates.map((coord, index) => (
              <Marker key={index} position={coord}></Marker>
            ))}
            <Polyline positions={routeCoordinates} color="blue" />
          </MapContainer>
        ) : (
          <p>Loading map...</p>
        )}
      </div>

      {/* Feedback Section */}
      <div className="feedback-section">
        <h2>Submit Feedback</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter feedback after your shift"
        ></textarea>
        <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
      </div>

      {/* GPS Location Update */}
      <div className="location-section">
        <button onClick={handleLocationSend} className="location-button">
          Send Current Location
        </button>
        {location && (
          <p>
            Your current location is: {location[0]}, {location[1]}
          </p>
        )}
      </div>
    </div>
  );
};

export default CrewDashboard;
