import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Details from "./pages/Details";
import Logout from "./pages/Logout";
import Transactions from "./pages/Transactions";

// If you want SecurityDemo as your home screen, import it here
// import SecurityDemo from "./SecurityDemo";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details" element={<Details />} />
        <Route path="/transactions" element={<Transactions />} />
        {/* <Route
          path="/details"
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/demo" element={<SecurityDemo />} /> */}
      </Routes>
    </Router>
  );
}
