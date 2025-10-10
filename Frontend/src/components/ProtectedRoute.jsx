
import { Navigate } from "react-router-dom";

// Helper function to decode JWT token
const decodeToken = (token) => {
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

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");

  // If no token, redirect to login
  if (!token) {
    alert("You must be logged in to access this page");
    return <Navigate to="/login" replace />;
  }

  // Decode token to get user role
  const decoded = decodeToken(token);

  if (!decoded || !decoded.roles || decoded.roles.length === 0) {
    alert("Invalid authentication. Please login again");
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // Get the primary role
  const userRole = decoded.roles[0].role;

  // Check if user's role is in the allowed roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    alert(`Access denied. This page is only accessible to ${allowedRoles.join(', ')} users.`);
    // Redirect based on their actual role
    if (userRole === "admin") {
      return <Navigate to="/transactions" replace />;
    } else if (userRole === "client") {
      return <Navigate to="/details" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  // User is authenticated and has the correct role
  return children;
}

// Export a simple authentication check component
export function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    alert("You must be logged in to access this page");
    return <Navigate to="/login" replace />;
  }
  
  return children;
}