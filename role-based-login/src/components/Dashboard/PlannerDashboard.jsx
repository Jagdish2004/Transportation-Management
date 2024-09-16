// src/components/Dashboard/PlannerDashboard.jsx
import React, { useState, useEffect } from 'react';
import useRoutes from '../../hooks/useRoutes';
import MapView from '../MapView.jsx';



const PlannerDashboard = () => {
  // Initialize routes as a state variable
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Simulate a data fetch or use dummy data
    const dummyRoutes = [
      {
        id: 'route1',
        coordinates: [
          { lat: 28.7041, lng: 77.1025 }, // Connaught Place, New Delhi
          { lat: 28.7100, lng: 77.1139 }, // Chandni Chowk, New Delhi
          { lat: 28.7257, lng: 77.1267 }, // Near Majnu Ka Tila
          { lat: 28.6692, lng: 77.2323 }  // Kashmere Gate, New Delhi
        ]
      },
      {
        id: 'route2',
        coordinates: [
          { lat: 28.5355, lng: 77.3910 }, // Noida City Center
          { lat: 28.5670, lng: 77.3200 }, // Sector 18, Noida
          { lat: 28.5793, lng: 77.3370 }, // Akshardham Temple, New Delhi
          { lat: 28.6139, lng: 77.2090 }  // India Gate, New Delhi
        ]
      },
      {
        id: 'route3',
        coordinates: [
          { lat: 28.4595, lng: 77.0266 }, // Gurgaon
          { lat: 28.4933, lng: 77.0821 }, // Sector 44, Gurgaon
          { lat: 28.5469, lng: 77.0903 }, // Near DLF CyberHub
          { lat: 28.6127, lng: 77.2792 }  // Connaught Place, New Delhi
        ]
      },
      {
        id: 'route4',
        coordinates: [
          { lat: 28.4089, lng: 77.3178 }, // Faridabad
          { lat: 28.4770, lng: 77.3024 }, // Badarpur Border, New Delhi
          { lat: 28.5350, lng: 77.2684 }, // Nehru Place, New Delhi
          { lat: 28.6127, lng: 77.2090 }  // JLN Stadium, New Delhi
        ]
      }
    ];
    

    // Simulate setting fetched data to state
    setRoutes(dummyRoutes);
  }, []);

  return (
    <div>
      <h2>Planner Dashboard</h2>
      {/* Ensure routes is passed down to MapView */}
      <MapView routes={routes} />
    </div>
  );
};

export default PlannerDashboard;
