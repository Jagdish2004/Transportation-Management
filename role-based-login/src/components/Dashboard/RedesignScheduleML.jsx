import React, { useState } from 'react';
import './RedesignScheduleML.css'; // Style this file as needed

const RedesignScheduleML = ({ onRedesign }) => {
  // Extended dummy data for overcrowded buses, including overcrowding time and extra buses
  const [overcrowdedBuses, setOvercrowdedBuses] = useState([
    { route: '101', busNo: 'B101', passengers: 90, capacity: 50, time: '8:30 AM', extraBuses: 2 },
    { route: '102', busNo: 'B102', passengers: 70, capacity: 50, time: '9:45 AM', extraBuses: 1 },
    { route: '103', busNo: 'B103', passengers: 85, capacity: 50, time: '11:20 AM', extraBuses: 3 },
    { route: '104', busNo: 'B104', passengers: 65, capacity: 50, time: '7:15 AM', extraBuses: 1 },
  ]);

  const [newSchedule, setNewSchedule] = useState([]);
  const [showEditButton, setShowEditButton] = useState(false);

  // Simulate ML model and heuristics generating a new schedule
  const handleRedesignSchedule = () => {
    alert('Schedule redesigned using ML and Heuristics!');

    // Generate new schedule with extra buses for overcrowded routes
    const generatedSchedule = overcrowdedBuses.flatMap(bus => {
      const baseSchedule = [
        { route: bus.route, busNo: bus.busNo, startTime: '8:00 AM', endTime: '10:00 AM' },
        { route: bus.route, busNo: bus.busNo, startTime: '10:00 AM', endTime: '12:00 PM' },
        { route: bus.route, busNo: bus.busNo, startTime: '12:00 PM', endTime: '2:00 PM' }
      ];

      // Add extra buses
      const extraBusesSchedule = Array.from({ length: bus.extraBuses }, (_, index) => ({
        route: bus.route,
        busNo: `${bus.busNo}-${index + 1}`, // Distinguish extra buses
        startTime: `2:00 PM`,
        endTime: `4:00 PM`
      }));

      return [...baseSchedule, ...extraBusesSchedule];
    });

    setNewSchedule(generatedSchedule);
    setShowEditButton(true);

    if (onRedesign) {
      onRedesign();  // Trigger any parent action if needed
    }
  };

  // Dummy edit function for now (can be expanded)
  const handleEditSchedule = () => {
    alert('Edit the generated schedule as needed.');
    // Logic to edit schedule can be added here
  };

  return (
    <div className="redesign-schedule-container">
      <h1>Redesign Schedule using ML</h1>

      {/* Overcrowded Buses Section */}
      <div className="overcrowded-section">
        <h2>Overcrowded Buses in Last Schedule</h2>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Bus No.</th>
              <th>Passengers</th>
              <th>Capacity</th>
              <th>peek Overcrowding Time</th>
              <th>Extra Buses Needed</th>
            </tr>
          </thead>
          <tbody>
            {overcrowdedBuses.map((bus, index) => (
              <tr key={index}>
                <td>{bus.route}</td>
                <td>{bus.busNo}</td>
                <td>{bus.passengers}</td>
                <td>{bus.capacity}</td>
                <td>{bus.time}</td>
                <td>{bus.extraBuses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Redesign Button */}
      <button className="ml-redesign-button" onClick={handleRedesignSchedule}>
        Redesign Schedule using ML
      </button>

      {/* Show New Schedule */}
      {newSchedule.length > 0 && (
        <div className="new-schedule-section">
          <h2>New Generated Schedule</h2>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Bus No.</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {newSchedule.map((schedule, index) => (
                <tr key={index}>
                  <td>{schedule.route}</td>
                  <td>{schedule.busNo}</td>
                  <td>{schedule.startTime}</td>
                  <td>{schedule.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Button */}
      {showEditButton && (
        <button className="edit-button" onClick={handleEditSchedule}>
          Edit Generated Schedule
        </button>
      )}
    </div>
  );
};

export default RedesignScheduleML;
