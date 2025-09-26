import { isValidEmail, isStrongPassword } from "../utils/validators";
import api from "../services/api";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!isStrongPassword(password)) {
      setError("Password must be at least 8 characters and include letters and numbers.");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      // navigate to dashboard...
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}


// import { isValidEmail, isStrongPassword } from "../utils/validators";
// import api from "../services/api";
// import { useState } from "react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Email and password are required.");
//       return;
//     }
//     if (!isValidEmail(email)) {
//       setError("Invalid email format.");
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
//     <form onSubmit={handleLogin}>{/* ...inputs, error UI... */}</form>
//   );
// }

// import LoginForm from "../components/LoginForm";

// export default function Login() {
//   return <LoginForm />;
// }
