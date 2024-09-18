import React, { useState } from 'react';
import './SchedulerDashboard.css';

const SchedulerDashboard = () => {
  const [schedule, setSchedule] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showRouteSchedule, setShowRouteSchedule] = useState(false);
  const [routeSchedule, setRouteSchedule] = useState([]);
  const [routeInput, setRouteInput] = useState('');
  const [absentCrewIds, setAbsentCrewIds] = useState([]);
  const [absentInput, setAbsentInput] = useState('');

  const routes = [100, 101, 102]; // Define routes

  // Function to generate random times
  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
  };

  // Function to generate unique start and end times
  const generateUniqueTimes = (existingTimes = []) => {
    let startTime, endTime;
    do {
      startTime = generateRandomTime();
      endTime = generateRandomTime();
    } while (existingTimes.includes(startTime) || existingTimes.includes(endTime));
    return { startTime, endTime };
  };

  // Create dummy schedule with varying times
  const handleCreateSchedule = () => {
    const existingTimes = new Set();

    const dummySchedule = Array.from({ length: 30 }, (_, index) => {
      const { startTime, endTime } = generateUniqueTimes([...existingTimes]);
      existingTimes.add(startTime);
      existingTimes.add(endTime);

      return {
        crew_id: `C${String(index + 1).padStart(3, '0')}`,
        route_no: (100 + (index % 3)).toString(), // 3 routes
        shift: ['Morning', 'Afternoon', 'Night'][index % 3],
        bus_no: `B${String(101 + index)}`,
        start_time: startTime,
        end_time: endTime,
        remarks: 'Drive Safe'
      };
    });

    setSchedule(dummySchedule);
    setShowPopup(true);
  };

  const handleUpdateDatabase = () => {
    alert('Database updated successfully with absent crew members!');
  };

  const handleAbsentInputChange = (e) => {
    setAbsentInput(e.target.value);
  };

  const handleAddAbsentCrew = () => {
    const crewIds = absentInput.split(',').map(id => id.trim()).filter(id => id);
    setAbsentCrewIds(crewIds);
    setAbsentInput('');
    handleUpdateDatabase();
  };

  const handlePublishSchedule = () => {
    alert('Schedule sent to crew members!');
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleRouteInputChange = (e) => {
    setRouteInput(e.target.value);
  };

  const handleShowRouteSchedule = () => {
    const routeNo = routeInput.trim();
    const filteredSchedule = schedule.filter(member => member.route_no === routeNo);

    if (filteredSchedule.length === 0) {
      alert(`No buses are scheduled for Route ID: ${routeNo}`);
      setRouteSchedule([{ route_no: routeNo, bus_no: null, start_time: null, end_time: null }]);
    } else {
      setRouteSchedule(filteredSchedule);
    }

    setShowRouteSchedule(true);
  };

  return (
    <div className="scheduler-dashboard">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1>Scheduler Dashboard</h1>

      <div className="absent-input-container">
        <input
          type="text"
          value={absentInput}
          onChange={handleAbsentInputChange}
          placeholder="Enter absent crew IDs (comma separated)"
        />
        <button className="update-button" onClick={handleAddAbsentCrew}>Update Database</button>
      </div>
      <div>
      <button className="create-schedule-button" onClick={handleCreateSchedule}>Update Schedule</button>
      </div>
      <div>
      <button className="create-schedule-button" onClick={handleCreateSchedule}>Create Schedule using ml</button>
      </div>
      
      {/* Popup to show created schedule */}
      {showPopup && (
        <div className="popup active">
          <p>Schedule has been created successfully!</p>
          <div className="popup-buttons-container">
            <button onClick={() => setShowSchedule(!showSchedule)}>
              {showSchedule ? 'Hide Schedule' : 'View Schedule'}
            </button>
            <button onClick={handlePublishSchedule}>Publish Schedule</button>
          </div>

          {showSchedule && (
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Crew ID</th>
                  <th>Route No.</th>
                  <th>Shift</th>
                  <th>Bus No.</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map(member => (
                  <tr key={member.crew_id}>
                    <td>{member.crew_id}</td>
                    <td>{member.route_no}</td>
                    <td>{member.shift}</td>
                    <td>{member.bus_no}</td>
                    <td>{member.start_time}</td>
                    <td>{member.end_time}</td>
                    <td>{member.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Route-wise Schedule Section */}
      <div className="route-input-container">
        <input
          type="text"
          value={routeInput}
          onChange={handleRouteInputChange}
          placeholder="Enter Route ID"
        />
        <button className="update-button" onClick={handleShowRouteSchedule}>Show Route-wise Schedule</button>
      </div>

      {/* Route-wise Schedule Popup */}
      {showRouteSchedule && (
        <div className="popup active">
          <h2>Route Schedule for Route ID: {routeInput}</h2>
          {routeSchedule[0].bus_no === null ? (
            <p>No buses are scheduled for this route.</p>
          ) : (
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Route No.</th>
                  <th>Bus No.</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {routeSchedule.map((bus, index) => (
                  <tr key={index}>
                    <td>{bus.route_no}</td>
                    <td>{bus.bus_no}</td>
                    <td>{bus.start_time}</td>
                    <td>{bus.end_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="popup-buttons-container">
            <button onClick={() => setShowRouteSchedule(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulerDashboard;