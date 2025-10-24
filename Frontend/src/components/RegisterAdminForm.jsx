// //frontend //src //components //RegisterAdminForm.jsx

import { useState } from "react";

import axios from "axios";

// import { isStrongPassword, ... } from "../utils/validators"; // You would import your client-side validators here

export default function RegisterForm() {

  // State initializes the form fields
  const [formData, setFormData] = useState({

    fullName: "",

    idNumber: "",

    accountNumber: "",

    password: "",

  });

  // State for displaying user-friendly errors

  const [error, setError] = useState(null);

  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear errors when user starts typing again

    setError(null);

    setMessage(null);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError(null);

    setMessage(null);

    setLoading(true);


    try {

      // Get token from localStorage (admin must be logged in)
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("You must be logged in as an admin");
        setLoading(false);
        return;
      }

      // 💡 CHANGED: Use /register-admin endpoint with Authorization header
      const res = await axios.post(
        "https://localhost:5000/api/auth/register-admin", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      // Success response

      setMessage(res.data.message || "Registration successful!");

      console.log("Registration successful:", res.data);

      // Clear form data here
      setFormData({ fullName: "", idNumber: "", accountNumber: "", password: "" });

    } catch (err) {

      console.error("Registration failed:", err.response?.data || err.message);

      let errorMessage = "Registration failed. Please check server status.";

      if (err.response?.data?.message) {

          // Captures structured messages like "Validation failed"

          errorMessage = err.response.data.message;

      } else if (err.response?.data?.errors?.length > 0) {

          // Captures specific validation errors from the backend

          // Maps and joins validation error messages

          errorMessage = err.response.data.errors.map(e => e.msg || e.message).join(' | ');

      } else if (err.response?.status === 403 || err.response?.status === 401) {

          errorMessage = "Access denied. Only admins can register other admins.";

      } else if (err.message === "Network Error" || err.code === "ERR_BAD_RESPONSE") {

          // This catches connection issues and the common HTTPS/CORS mismatch

          errorMessage = "Network Error. Check if the backend is running on HTTPS and CORS is configured.";

      }

      setError(errorMessage);

    } finally {

      setLoading(false);

    }

  };

  return (
<div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
<form onSubmit={handleSubmit} className="space-y-4">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Registration</h2>

        {/* Input Fields */}
<input

          name="fullName"

          placeholder="Full Name"

          value={formData.fullName}

          onChange={handleChange}

          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

        />
<input

          name="idNumber"

          placeholder="National ID Number (13 digits)"

          value={formData.idNumber}

          onChange={handleChange}

          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

        />
<input

          name="accountNumber"

          placeholder="Account Number"

          value={formData.accountNumber}

          onChange={handleChange}

          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

        />
<input

          name="password"

          type="password"

          placeholder="Password (Min 8 chars, 1 letter, 1 number)"

          value={formData.password}

          onChange={handleChange}

          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

        />

        {/* Error/Success Messages */}

        {error && (
<p className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border-l-4 border-red-500">

            Error: {error}
</p>

        )}

        {message && (
<p className="p-3 text-sm text-green-700 bg-green-100 rounded-lg border-l-4 border-green-500">

            Success: {message}
</p>

        )}

        {/* Submit Button */}
<button

          type="submit"

          disabled={loading}

          className={`w-full py-3 px-4 font-semibold text-white rounded-lg transition duration-300

            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
>

          {loading ? 'Registering...' : 'Register'}
</button>
</form>
</div>

  );

}