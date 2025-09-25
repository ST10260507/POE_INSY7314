// src/components/RegisterForm.jsx
import { useState } from "react";
import API from "../services/api";
// Example in RegisterForm.jsx
import "./RegisterForm.css";


export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { email, password });
      localStorage.setItem("token", res.data.token);
      setMessage("Registration complete");
    } catch {
      setMessage("Email already exists");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}
