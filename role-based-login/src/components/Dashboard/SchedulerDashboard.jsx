import React, { useState, useEffect } from 'react';
import './SchedulerDashboard.css';
import { useNavigate } from 'react-router-dom';

const SchedulerDashboard = () => {
  const [schedule, setSchedule] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showRouteSchedule, setShowRouteSchedule] = useState(false);
  const [routeSchedule, setRouteSchedule] = useState([]);
  const [routeInput, setRouteInput] = useState('');
  const [absentCrewIds, setAbsentCrewIds] = useState([]);
  const [absentInput, setAbsentInput] = useState('');
  const [totalAvailableCrew, setTotalAvailableCrew] = useState(20); // Initial count of crew members
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [crewAlerts, setCrewAlerts] = useState([]);
  const navigate = useNavigate();

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
    const crewCount = 10; // Number of unique crew members
    const linkedCrewCount = 7; // Number of crew members with linked duties
    const unlinkedCrewCount = crewCount - linkedCrewCount; // Number of crew members with unlinked duties
  
    const shifts = ['Morning', 'Afternoon', 'Night']; // Different shifts available
    const dummySchedule = [];
  
    // Generate linked duty schedule
    for (let crewIndex = 0; crewIndex < linkedCrewCount; crewIndex++) {
      const crewId = `C${String(crewIndex + 1).padStart(3, '0')}`;
      const busNo = `B${String(101 + crewIndex)}`;
      const routeNo = (100 + (crewIndex % 3)).toString(); // 3 routes
      const shift = shifts[crewIndex % shifts.length]; // Rotate shifts for linked duty
  
      for (let trip = 0; trip < 3; trip++) {
        const { startTime, endTime } = generateUniqueTimes([...existingTimes]);
        existingTimes.add(startTime);
        existingTimes.add(endTime);
  
        dummySchedule.push({
          crew_id: crewId,
          route_no: routeNo,
          shift: shift,
          bus_no: busNo,
          start_time: startTime,
          end_time: endTime,
          remarks: 'Drive Safe'
        });
      }
    }
  
    // Generate unlinked duty schedule
    for (let crewIndex = linkedCrewCount; crewIndex < crewCount; crewIndex++) {
      const crewId = `C${String(crewIndex + 1).padStart(3, '0')}`;
      const busNo = `B${String(201 + crewIndex)}`;
      const routeNo = (100 + (crewIndex % 3)).toString(); // 3 routes
      const shift = shifts[(crewIndex + linkedCrewCount) % shifts.length]; // Assign different shifts
      const { startTime, endTime } = generateUniqueTimes([...existingTimes]);
      existingTimes.add(startTime);
      existingTimes.add(endTime);
  
      dummySchedule.push({
        crew_id: crewId,
        route_no: routeNo,
        shift: shift,
        bus_no: busNo,
        start_time: startTime,
        end_time: endTime,
        remarks: 'Drive Safe'
      });
    }
  
    setSchedule(dummySchedule);
    setTotalAvailableCrew(totalAvailableCrew - crewCount); // Decrease available crew count
    setShowPopup(true);
  };

  const handleUpdateDatabase = () => {
    alert('Database updated successfully with absent crew members!');
    setTotalAvailableCrew(totalAvailableCrew - absentCrewIds.length); // Adjust as necessary
  };

  const handleRedesignSchedule = () => {
    navigate('/redesign-ml');
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

  // Function to handle crew alerts
  const handleCrewAlert = () => {
    // Simulate receiving dummy alerts related to overcrowding and delays
    const dummyAlerts = [
      `Alert: Overcrowding reported on Route 100.`,

      `Alert: Delay on Route 101.`,
    ];
    // Filter only overcrowding and delay alerts
    const filteredAlerts = dummyAlerts.filter(alert => alert.includes('Overcrowding') || alert.includes('Delay'));
    setCrewAlerts(filteredAlerts);
  };

  // Use effect to simulate alerts on component mount
  useEffect(() => {
    handleCrewAlert();
  }, []);

  return (
    <div className="scheduler-dashboard">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1>Scheduler Dashboard</h1>

      <p>Total Available Crew: {totalAvailableCrew}</p>

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
        <button className="ml-redesign-button" onClick={handleRedesignSchedule}>
          Redesign Schedule using ML
        </button>
      </div>
      
      <div>
        <button className="create-schedule-button" onClick={handleCreateSchedule}>Assign Daily Duty</button>
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
          placeholder="Enter Route ID to view schedule"
        />
        <button className="view-schedule-button" onClick={handleShowRouteSchedule}>
          Show Route Schedule
        </button>
      </div>

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

      {/* Crew Alerts Section */}
      <div className="alerts-container">
        <h2>Crew Alerts</h2>
        {crewAlerts.length === 0 ? (
          <p>No alerts received.</p>
        ) : (
          <ul>
            {crewAlerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SchedulerDashboard;
