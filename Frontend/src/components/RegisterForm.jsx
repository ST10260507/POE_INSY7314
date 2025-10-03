// src/components/RegisterForm.jsx
import { useState } from "react";
import API from "../services/api";
// Example in RegisterForm.jsx
import "./RegisterForm.css";


export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { fullName, email, password, idNumber, accountNumber });
      localStorage.setItem("token", res.data.token);
      setMessage("Registration complete");
    } catch {
      setMessage("Email already exists");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Id Number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
      <input placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}


// // src/components/RegisterForm.jsx
// import { useState } from "react";
// import API from "../services/api";
// // Example in RegisterForm.jsx
// import "./RegisterForm.css";


// export default function RegisterForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/register", { email, password });
//       localStorage.setItem("token", res.data.token);
//       setMessage("Registration complete");
//     } catch {
//       setMessage("Email already exists");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>
//       <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Register</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }
