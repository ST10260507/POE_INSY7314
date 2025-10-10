// src/utils/authUtils.js

/**
 * Decodes a JWT token to extract payload information
 * @param {string} token - The JWT token to decode
 * @returns {object|null} - The decoded token payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Gets the current user's role from the stored JWT token
 * @returns {string|null} - The user's role or null if not authenticated
 */
export const getUserRole = () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return null;
  }
  
  const decoded = decodeToken(token);
  
  if (decoded && decoded.roles && decoded.roles.length > 0) {
    return decoded.roles[0].role;
  }
  
  return null;
};

/**
 * Checks if the user is authenticated
 * @returns {boolean} - True if user has a valid token
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return false;
  }
  
  const decoded = decodeToken(token);
  
  // Check if token is expired
  if (decoded && decoded.exp) {
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Token expired, remove it
      localStorage.removeItem("token");
      return false;
    }
  }
  
  return decoded !== null;
};

/**
 * Checks if the current user has a specific role
 * @param {string} role - The role to check for
 * @returns {boolean} - True if user has the specified role
 */
export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

/**
 * Checks if the current user has any of the specified roles
 * @param {string[]} roles - Array of roles to check
 * @returns {boolean} - True if user has any of the specified roles
 */
export const hasAnyRole = (roles) => {
  const userRole = getUserRole();
  return roles.includes(userRole);
};

/**
 * Gets the user's full information from the token
 * @returns {object|null} - User information or null
 */
export const getUserInfo = () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return null;
  }
  
  const decoded = decodeToken(token);
  
  if (decoded) {
    return {
      id: decoded.id,
      accountNumber: decoded.accountNumber,
      roles: decoded.roles,
      primaryRole: decoded.roles && decoded.roles.length > 0 ? decoded.roles[0].role : null
    };
  }
  
  return null;
};

/**
 * Logs out the user by removing the token and triggering auth change
 */
export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event('authChange'));
};