// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to My App</h1>
      <p>
        This is a secure React application with authentication.
        Register or login to access your personal dashboard.
      </p>
      <Link to="/register">Get Started</Link>
    </div>
  );
}
