import React, { useState } from 'react';
import './SchedulerDashboard.css';

const SchedulerDashboard = () => {
  const [schedule, setSchedule] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [absentCrewIds, setAbsentCrewIds] = useState([]);
  const [absentInput, setAbsentInput] = useState('');

  const handleCreateSchedule = () => {
    const dummySchedule = Array.from({ length: 10 }, (_, index) => ({
      crew_id: `C${String(index + 1).padStart(3, '0')}`,
      route_no: (100 + index).toString(),
      shift: ['Morning', 'Afternoon', 'Night'][index % 3],
      bus_no: `B${String(101 + index)}`,
      start_time: ['06:00 AM', '02:00 PM', '10:00 PM'][index % 3],
      end_time: ['02:00 PM', '10:00 PM', '06:00 AM'][index % 3],
      remarks: 'Drive Safe' // All members are present, so no need for 'On Leave'
    }));

    setSchedule(dummySchedule);
    setShowPopup(true);
  };

  const handleUpdateDatabase = () => {
    // Simulate updating the database with the absent crew IDs
    alert('Database updated successfully with absent crew members!');
  };

  const handleAbsentInputChange = (e) => {
    setAbsentInput(e.target.value);
  };

  const handleAddAbsentCrew = () => {
    const crewIds = absentInput.split(',').map(id => id.trim()).filter(id => id);
    setAbsentCrewIds(crewIds);
    setAbsentInput('');
    // Here you would typically send a request to your backend to update the database
    handleUpdateDatabase();
  };

  const handlePublishSchedule = () => {
    // Handle publishing schedule logic here
    alert('Schedule sent to crew members!');
  };

  const handleLogout = () => {
    // Clear session or authentication tokens here
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <div className="scheduler-dashboard">
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      <h1>Scheduler Dashboard</h1>

      {/* Input for absent crew members */}
      <div className="absent-input-container">
        <input
          type="text"
          value={absentInput}
          onChange={handleAbsentInputChange}
          placeholder="Enter absent crew IDs (comma separated)"
        />
        <button onClick={handleAddAbsentCrew}>Update Database</button>
      </div>

      {/* Create Schedule Button */}
      <button className="create-schedule-button" onClick={handleCreateSchedule}>Create Schedule</button>

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
    </div>
  );
};

export default SchedulerDashboard;
