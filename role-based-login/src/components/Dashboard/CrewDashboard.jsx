// src/components/Dashboard/CrewDashboard.jsx
import React, { useState } from 'react';

const CrewDashboard = () => {
  const [crewMembers, setCrewMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Driver', status: 'Available' },
    { id: 2, name: 'Jane Smith', role: 'Conductor', status: 'On Route' },
    { id: 3, name: 'Alex Johnson', role: 'Maintenance', status: 'Busy' },
  ]);

  const handleAssignTask = (id) => {
    // Logic to assign tasks to crew members
    console.log(`Assigning task to crew member with ID: ${id}`);
  };

  return (
    <div>
      <h2>Crew Dashboard</h2>
      <div>
        <h3>Crew Members</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {crewMembers.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.status}</td>
                <td>
                  <button onClick={() => handleAssignTask(member.id)}>
                    Assign Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Task Management</h3>
        {/* Add task assignment, scheduling or other task management features here */}
        <p>Assign tasks to crew members based on their availability.</p>
      </div>

      <div>
        <h3>Schedule Overview</h3>
        {/* Add schedule display or schedule management here */}
        <p>View and manage crew schedules for the day.</p>
      </div>
    </div>
  );
};

export default CrewDashboard;
