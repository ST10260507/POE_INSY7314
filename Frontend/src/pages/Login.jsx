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


// import { isValidEmail, isStrongPassword } from "../utils/validators";
// import api from "../services/api";
// import { useState } from "react";

// export default function Login() {
//     const [FullName, setFullName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [idNumber, setIdNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!accountNumber || !password || !idNumber) {
//       setError("All credentials must be filled in.");
//       return;
//     }
//     if (!isStrongPassword(password)) {
//       setError("Password must be at least 8 characters and include letters and numbers.");
//       return;
//     }

//     try {
//       const res = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       // navigate to dashboard...
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input
//         type="FullName"
//         placeholder="Full Name"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="idNumber"
//         placeholder="ID Number"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="accountNumber"
//         placeholder="Account Number"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }


// // import { isValidEmail, isStrongPassword } from "../utils/validators";
// // import api from "../services/api";
// // import { useState } from "react";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     if (!email || !password) {
// //       setError("Email and password are required.");
// //       return;
// //     }
// //     if (!isValidEmail(email)) {
// //       setError("Invalid email format.");
// //       return;
// //     }
// //     if (!isStrongPassword(password)) {
// //       setError("Password must be at least 8 characters and include letters and numbers.");
// //       return;
// //     }

// //     try {
// //       const res = await api.post("/auth/login", { email, password });
// //       localStorage.setItem("token", res.data.token);
// //       // navigate to dashboard...
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Login failed");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleLogin}>{/* ...inputs, error UI... */}</form>
// //   );
// // }

// // import LoginForm from "../components/LoginForm";

// // export default function Login() {
// //   return <LoginForm />;
// // }
