
//src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    
    // Trigger navbar update
    window.dispatchEvent(new Event('authChange'));
    
    // Show logout message
    alert("You have been logged out successfully");
    
    // Navigate to home page
    navigate("/home");
  }, [navigate]);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh" 
    }}>
      <p>Logging out...</p>
    </div>
  );
}