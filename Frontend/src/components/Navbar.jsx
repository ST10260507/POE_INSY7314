import { Link } from "react-router-dom";
import "./Navbar.css";

const isLoggedIn = () => !!localStorage.getItem("token");

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
        <>
          <Link to="/logout">Logout</Link>
          <Link to="/details">Details</Link>
        </>
                <>
          <Link to="/transactions">Transactions</Link>
        </>
    </nav>
  );
}
