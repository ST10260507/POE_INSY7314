
//src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

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

export default function Navbar() {
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      setIsLoggedIn(true);
      const decoded = decodeToken(token);
      
      if (decoded && decoded.roles && decoded.roles.length > 0) {
        // Get the primary role from the roles array
        const primaryRole = decoded.roles[0].role;
        setUserRole(primaryRole);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  // Function to update navbar when login/logout occurs
  const updateNavbar = () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      setIsLoggedIn(true);
      const decoded = decodeToken(token);
      
      if (decoded && decoded.roles && decoded.roles.length > 0) {
        const primaryRole = decoded.roles[0].role;
        setUserRole(primaryRole);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  };


  useEffect(() => {
    window.addEventListener('storage', updateNavbar);
    
    // Custom event for same-tab updates
    window.addEventListener('authChange', updateNavbar);
    
    return () => {
      window.removeEventListener('storage', updateNavbar);
      window.removeEventListener('authChange', updateNavbar);
    };
  }, []);

  return (
    <nav className="navbar">
      {/* Home - visible to everyone */}
      <Link to="/home">Home</Link>
      
      {/* Show Register/Login only when not logged in */}
      {!isLoggedIn && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      
      {/* Show role-specific links when logged in */}
      {isLoggedIn && (
        <>
          {/* Client-only links */}
          {userRole === "client" && (
            <Link to="/details">Details</Link>
          )}
          
          {/* Admin-only links */}
          {userRole === "admin" && (
            <>
              <Link to="/transactions">Transactions</Link>
              <Link to="/security-demo">Security Demo</Link>
            </>
          )}
          
          {/* Logout - visible to all logged-in users */}
          <Link to="/logout">Logout</Link>
        </>
      )}
    </nav>
  );
}