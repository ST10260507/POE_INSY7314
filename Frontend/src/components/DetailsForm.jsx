//src/components/DetailsForm.jsx
import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./DetailsForm.css";

// 1. Define a clear structure for initial state
const INITIAL_FORM_STATE = {
  fullName: "",
  bankName: "",
  accountNumber: "",
  accountType: "checking", // Default to 'checking'
  swiftCode: "", // Corrected camelCase for professionalism
  cardNumber: "",
  expirationDate: "",
};

export default function DetailsForm() {
  // 2. Use a single state object for all form fields
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 3. Add loading state

  const navigate = useNavigate();

  // 4. Handle input changes with a single function
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setIsSubmitting(true); // Start loading

    // 5. Destructure the data we are sending
    const { swiftCode, ...dataToSend } = formData;
    
    // 6. Use optional fields conditionally (e.g., swiftCode)
    const payload = swiftCode ? { ...dataToSend, swiftCode } : dataToSend;

    try {
      await API.post("/details", payload);

      setMessage("Details submitted successfully! Redirecting...");
      
      // Navigate after a short delay for the user to see the success message
      setTimeout(() => {
        navigate("/summary");
      }, 1500);

    } catch (err) {
      console.error("Submission error:", err);
      // 7. Enhanced error message handling
      setMessage(
        err.response?.data?.message || "Failed to submit details. Please try again."
      );
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  // 8. Define the input fields and their properties in a structured way (optional but cleaner)
  const formFields = useMemo(() => [
    { name: "fullName", type: "text", placeholder: "Full Name", required: true },
    { name: "bankName", type: "text", placeholder: "Bank Name", required: true },
    { name: "accountNumber", type: "text", placeholder: "Account Number", required: true },
    { name: "swiftCode", type: "text", placeholder: "SWIFT/BIC Code (If applicable)" },
    { name: "cardNumber", type: "text", placeholder: "Card Number (Optional)", maxLength: 19 }, // Added maxLength
    { name: "expirationDate", type: "text", placeholder: "Card Expiration (MM/YY)", maxLength: 5 }, // Added maxLength and specific format
  ], []);

  return (
    <div className="details-form-container"> {/* New container for better centering/styling */}
      <form className="details-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Secure Banking Details Entry</h2>

        {/* Display Message/Alert Area */}
        {message && (
          <p className={`form-message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        {/* Form Fields */}
        {formFields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name} // Crucial for single handleChange function
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            maxLength={field.maxLength}
            // 9. Added autocomplete for security/UX
            autoComplete={field.name.includes('card') ? 'cc-' + field.name : field.name}
            disabled={isSubmitting} // Disable during submission
          />
        ))}

        {/* Account Type Select */}
        <div className="select-wrapper"> {/* Wrap select for better styling */}
          <select 
            name="accountType"
            value={formData.accountType} 
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="checking">Checking Account</option>
            <option value="savings">Savings Account</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} // Use the loading state to disable the button
          className="submit-button" // Add a class for styling
        >
          {isSubmitting ? "Submitting..." : "Submit Payment Details"}
        </button>
      </form>
    </div>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import "./DetailsForm.css";

// export default function DetailsForm() {
//   const [fullName, setFullName] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [accountType, setAccountType] = useState("checking");
//   const [swiftcode, setswiftcode] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expirationDate, setExpirationDate] = useState("");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // await API.post("/auth/details", {
//       //   fullName,
//       //   bankName,
//       //   accountNumber,
//       //   accountType,
//       //   swiftcode,
//       //   cardNumber,
//       //   expirationDate,
//       // });
//         await API.post("/details", {
//           fullName,
//           bankName,
//           accountNumber,
//           accountType,
//           swiftcode,
//           cardNumber,
//           expirationDate,
//         });

//       setMessage("Details submitted successfully!");

//       // Redirect to Summary page
//       navigate("/summary");
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || "Failed to submit details");
//     }
//   };

//   return (
//     <form className="details-form" onSubmit={handleSubmit}>
//       <h2>Enter Your Banking Details</h2>
//       {message && <p>{message}</p>}

//       <input
//         type="text"
//         placeholder="Full Name"
//         value={fullName}
//         onChange={(e) => setFullName(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Bank Name"
//         value={bankName}
//         onChange={(e) => setBankName(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Account Number"
//         value={accountNumber}
//         onChange={(e) => setAccountNumber(e.target.value)}
//         required
//       />
//       <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
//         <option value="checking">Checking</option>
//         <option value="savings">Savings</option>
//       </select>
//       <input
//         type="text"
//         placeholder="Swift code"
//         value={swiftcode}
//         onChange={(e) => setswiftcode(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Card Number (optional)"
//         value={cardNumber}
//         onChange={(e) => setCardNumber(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Card Expiration (MM/YY)"
//         value={expirationDate}
//         onChange={(e) => setExpirationDate(e.target.value)}
//       />

//       <button type="submit">Submit Details</button>
//     </form>
//   );
// }


// // import { useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import API from "../services/api";
// // import "./DetailsForm.css";

// // export default function DetailsForm() {
// //   const [fullName, setFullName] = useState("");
// //   const [bankName, setBankName] = useState("");
// //   const [accountNumber, setAccountNumber] = useState("");
// //   const [accountType, setAccountType] = useState("checking");
// //   const [swiftcode, setswiftcode] = useState("");
// //   const [cardNumber, setCardNumber] = useState("");
// //   const [expirationDate, setExpirationDate] = useState("");
// //   const [message, setMessage] = useState("");

// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       // Send banking details to your backend
// //       const res = await API.post("/auth/details", {
// //         fullName,
// //         bankName,
// //         accountNumber,
// //         accountType,
// //         swiftcode,
// //         cardNumber,
// //         expirationDate,
// //       });

// //       setMessage("Details submitted successfully!");
// //       // Optionally navigate somewhere after submission
// //       navigate("/dashboard");
// //     } catch (err) {
// //       console.error(err);
// //       setMessage(err.response?.data?.message || "Failed to submit details");
// //     }
// //   };

// //   return (
// //     <form className="details-form" onSubmit={handleSubmit}>
// //       <h2>Enter Your Banking Details</h2>
// //       {location.state?.message && <p>{location.state.message}</p>}
      
// //       <input
// //         type="text"
// //         placeholder="Full Name"
// //         value={fullName}
// //         onChange={(e) => setFullName(e.target.value)}
// //         required
// //       />
// //       <input
// //         type="text"
// //         placeholder="Bank Name"
// //         value={bankName}
// //         onChange={(e) => setBankName(e.target.value)}
// //         required
// //       />
// //       <input
// //         type="text"
// //         placeholder="Account Number"
// //         value={accountNumber}
// //         onChange={(e) => setAccountNumber(e.target.value)}
// //         required
// //       />
// //       <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
// //         <option value="checking">Checking</option>
// //         <option value="savings">Savings</option>
// //       </select>
// //       <input
// //         type="text"
// //         placeholder="Swift Code"
// //         value={swiftcode}
// //         onChange={(e) => setswiftcode(e.target.value)}
// //       />
// //       <input
// //         type="text"
// //         placeholder="Card Number (optional)"
// //         value={cardNumber}
// //         onChange={(e) => setCardNumber(e.target.value)}
// //       />
// //       <input
// //         type="text"
// //         placeholder="Card Expiration (MM/YY)"
// //         value={expirationDate}
// //         onChange={(e) => setExpirationDate(e.target.value)}
// //       />

// //       <button type="submit">Submit Details</button>
// //       {message && <p>{message}</p>}
// //     </form>
// //   );
// // }
