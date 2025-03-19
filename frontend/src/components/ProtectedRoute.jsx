import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/home" />;
    }

    return <Component />;
};

export default ProtectedRoute;