import React from 'react';
import { getCurrentUser } from '../utils/auth';
import '../style/Dashboard.css';

function OwnerDashboard() {
  const currentUser = getCurrentUser();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Owner Dashboard</h1>
        <p>Welcome, {currentUser?.name || 'Owner'}</p>
      </div>
      
      <div className="dashboard-content">
        <p>This is the owner dashboard. Content will be added soon.</p>
      </div>
    </div>
  );
}

export default OwnerDashboard; 