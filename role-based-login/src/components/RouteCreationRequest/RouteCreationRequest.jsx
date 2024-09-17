import React from 'react';
import './RouteCreationRequest.css';

const RouteCreationRequest = ({ requests, onApprove, onDecline }) => {
  return (
    <div className="route-creation-requests">
      <h3>Route Creation Requests</h3>
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            <p><strong>Route Number:</strong> {request.routeNumber}</p>
            <p><strong>Bus Stops:</strong></p>
            <ul>
              {request.busStops.map((stop, index) => (
                <li key={index}>{`Stop ${index + 1}: [Lat: ${stop[0]}, Lng: ${stop[1]}]`}</li>
              ))}
            </ul>
            <button onClick={() => onApprove(request)}>Approve and Add Route</button>
            <button onClick={() => onDecline(request)}>Decline Request</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteCreationRequest;
