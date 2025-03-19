import React from 'react';
import { getCurrentUser } from '../utils/auth';
import '../style/Dashboard.css';

function AdminDashboard() {
  const currentUser = getCurrentUser();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {currentUser?.name || 'Admin'}</p>
      </div>
      
      <div className="dashboard-content">
        <p>This is the admin dashboard. Content will be added soon.</p>
      </div>
    </div>
  );
}

export default AdminDashboard; 