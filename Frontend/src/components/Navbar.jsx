// src/components/Navbar.jsx
import { Link } from "react-router-dom";
// Example in Navbar.jsx
import "./Navbar.css";


const isLoggedIn = () => !!localStorage.getItem("token");

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {isLoggedIn() ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}
