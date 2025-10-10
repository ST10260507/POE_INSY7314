
//src/pages/Login.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    accountNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("https://localhost:5000/api/auth/login", formData, {
        withCredentials: true,
      });
      
      // Store token
      localStorage.setItem("token", res.data.token);
      
      // Trigger navbar update
      window.dispatchEvent(new Event('authChange'));
      
      alert("Login successful!");
      console.log(res.data);
      
      // Navigate based on role
      // Decode token to get role
      const token = res.data.token;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      
      // Navigate to appropriate page based on role
      if (decoded.roles && decoded.roles.length > 0) {
        const primaryRole = decoded.roles[0].role;
        if (primaryRole === "admin") {
          navigate("/transactions");
        } else if (primaryRole === "client") {
          navigate("/details");
        } else {
          navigate("/home");
        }
      } else {
        navigate("/home");
      }
      
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          disabled={loading}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="text"
          name="idNumber"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={handleChange}
          required
          disabled={loading}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          required
          disabled={loading}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
          style={{ width: "100%", marginBottom: "20px", padding: "10px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#6c757d" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}