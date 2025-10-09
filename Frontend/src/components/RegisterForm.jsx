// //frontend //src //components //RegisterForm.jsx

import { useState } from "react";

import axios from "axios";

// import { isStrongPassword, ... } from "../utils/validators"; // You would import your client-side validators here

export default function RegisterForm() {

  // State initializes the role field to 'client'.

  const [formData, setFormData] = useState({

    fullName: "",

    idNumber: "",

    accountNumber: "",

    password: "",

    role: "client" // 💡 The role is fixed here.

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

      // 💡 CRITICAL FIX: Changed URL to HTTPS to match backend server setup (and solve CORS/connection issues)

      const res = await axios.post("https://localhost:5000/api/auth/register", formData);

      // Success response

      setMessage(res.data.message || "Registration successful!");

      console.log("Registration successful:", res.data);

      // Optionally clear form data here (keeping the role fixed)

      setFormData({ fullName: "", idNumber: "", accountNumber: "", password: "", role: "client" });

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
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Client Registration</h2>

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

        {/* 💡 HIDDEN FIELD: Sends the fixed role to the backend */}
<input 

          type="hidden" 

          name="role" 

          value={formData.role} 

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
 

// // //frontend //src //components //RegisterForm.jsx

// import { useState } from "react";
// import axios from "axios";
// // import { isStrongPassword, ... } from "../utils/validators"; // You would import your client-side validators here

// export default function RegisterForm() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     idNumber: "",
//     accountNumber: "",
//     password: "",
//     role: "client"
//   });
//   // State for displaying user-friendly errors
//   const [error, setError] = useState(null); 
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // Clear errors when user starts typing again
//     setError(null); 
//     setMessage(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);
//     setLoading(true);


//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      
//       // Success response
//       setMessage(res.data.message || "Registration successful!");
//       console.log("Registration successful:", res.data);
//       // Optionally clear form data here
//       setFormData({ fullName: "", idNumber: "", accountNumber: "", password: "" }); 

//     } catch (err) {
//       console.error("Registration failed:", err.response?.data || err.message);
      
//       let errorMessage = "Registration failed. Please check server status.";

//       if (err.response?.data?.message) {
//           // Captures structured messages like "Validation failed"
//           errorMessage = err.response.data.message;
//       } else if (err.response?.data?.errors?.length > 0) {
//           // Captures specific validation errors from the backend
//           errorMessage = err.response.data.errors.map(e => e.msg || e.message).join(' | ');
//       } else if (err.message === "Network Error") {
//           // This is often the CORS issue
//           errorMessage = "Network Error. Check if the backend is running and CORS is configured.";
//       }
      
//       setError(errorMessage);

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Client Registration</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Input Fields */}
//         <input 
//           name="fullName" 
//           placeholder="Full Name" 
//           value={formData.fullName} 
//           onChange={handleChange} 
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input 
//           name="idNumber" 
//           placeholder="National ID Number (13 digits)" 
//           value={formData.idNumber} 
//           onChange={handleChange} 
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input 
//           name="accountNumber" 
//           placeholder="Account Number" 
//           value={formData.accountNumber} 
//           onChange={handleChange} 
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input 
//           name="password" 
//           type="password" 
//           placeholder="Password (Min 8 chars, 1 letter, 1 number)" 
//           value={formData.password} 
//           onChange={handleChange} 
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Error/Success Messages */}
//         {error && (
//           <p className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border-l-4 border-red-500">
//             Error: {error}
//           </p>
//         )}
//         {message && (
//           <p className="p-3 text-sm text-green-700 bg-green-100 rounded-lg border-l-4 border-green-500">
//             Success: {message}
//           </p>
//         )}

//         {/* Submit Button */}
//         <button 
//           type="submit" 
//           disabled={loading}
//           className={`w-full py-3 px-4 font-semibold text-white rounded-lg transition duration-300 
//             ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
//         >
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
//     </div>
//   );
// }



// // import axios from "axios";
// // import { useState } from "react";

// // export default function RegisterForm() {
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     idNumber: "",
// //     accountNumber: "",
// //     password: "",
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await axios.post("http://localhost:5000/api/auth/register", formData);
// //       alert("Registration successful!");
// //       console.log(res.data);
// //     } catch (err) {
// //       console.error("Registration failed:", err.response?.data || err.message);
// //       alert("Registration failed!");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input name="fullName" placeholder="Full Name" onChange={handleChange} />
// //       <input name="idNumber" placeholder="ID Number" onChange={handleChange} />
// //       <input name="accountNumber" placeholder="Account Number" onChange={handleChange} />
// //       <input name="password" type="password" placeholder="Password" onChange={handleChange} />
// //       <button type="submit">Register</button>
// //     </form>
// //   );
// // }