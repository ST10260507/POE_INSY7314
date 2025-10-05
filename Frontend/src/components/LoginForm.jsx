import axios from "axios";
import { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    accountNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5173/api/auth/login", formData);
      alert("Login successful!");
      console.log(res.data);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="idNumber" placeholder="ID Number" onChange={handleChange} />
      <input name="accountNumber" placeholder="Account Number" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}


// // src/components/LoginForm.jsx
// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import API from "../services/api";
// // Example in LoginForm.jsx
// import "./LoginForm.css";


// export default function LoginForm() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [idNumber, setIdNumber] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", { fullName, email, password, idNumber,accountNumber });
//       localStorage.setItem("token", res.data.token);
//       setMessage("Login successful");
//       navigate("/dashboard");
//     } catch {
//       setMessage("Invalid credentials");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       {location.state?.message && <p>{location.state.message}</p>}
//       <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
//       <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input placeholder="Id Number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
//       <input placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }


// // src/components/LoginForm.jsx
// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import API from "../services/api";
// // Example in LoginForm.jsx
// import "./LoginForm.css";


// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       setMessage("Login successful");
//       navigate("/dashboard");
//     } catch {
//       setMessage("Invalid credentials");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       {location.state?.message && <p>{location.state.message}</p>}
//       <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }
