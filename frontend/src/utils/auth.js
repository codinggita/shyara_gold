// Authentication utility functions

// Get the current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

// Get the authentication token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Check if user has a specific role
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

// Logout user by removing token and user from localStorage
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Add authorization header to fetch requests
export const authHeader = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Fetch with authentication
export const authenticatedFetch = async (url, options = {}) => {
  const headers = {
    ...options.headers,
    ...authHeader(),
    'Content-Type': 'application/json'
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  // If unauthorized (token expired or invalid), logout
  if (response.status === 401) {
    logout();
    window.location.href = '/login';
    throw new Error('Your session has expired. Please login again.');
  }

  return response;
}; 