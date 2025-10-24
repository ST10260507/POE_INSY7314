// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute, { RequireAuth } from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Details from "./pages/Details";
import Logout from "./pages/Logout";
import Transactions from "./pages/Transactions";
import SecurityDemo from "./SecurityDemo";
import Summary from "./pages/summary";
import RegisterAdmin from "./pages/RegisterAdmin";
import ListOfAdminList from "./pages/ListOfAdmin";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Client-Only Routes */}
        <Route 
          path="/details" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <Details />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/summary" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <Summary />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin-Only Routes */}
        <Route 
          path="/transactions" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Transactions />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/register-admin" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RegisterAdmin />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin-list" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ListOfAdminList />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/security-demo" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SecurityDemo />
            </ProtectedRoute>
          } 
        />
        
        {/* Routes that require authentication but no specific role */}
        <Route 
          path="/logout" 
          element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          } 
        />
      </Routes>
    </Router>
  );
}