//src/pages/Login.jsx
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    accountNumber: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://localhost:5000/api/auth/login", formData, {
        withCredentials: true, // optional if you use cookies/tokens
      });
      alert("Login successful!");
      console.log(res.data);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed!");
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
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="text"
          name="idNumber"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "20px", padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}