//src/components/DetailsForm.jsx
import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./DetailsForm.css";

// 1. Define a clear structure for initial state
const INITIAL_FORM_STATE = {
  fullName: "",
  amount: "",
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
      await API.post("/transactiondetails", payload, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

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
    { name: "fullName", type: "text", placeholder: "Full Name of recipient", required: true },
    { name: "bankName", type: "text", placeholder: "Bank Name of recipient", required: true },
    { name: "amount", type: "number", placeholder: "Amount", required: true },
    { name: "accountNumber", type: "text", placeholder: "Account Number", required: true },
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

      <div className="select-wrapper">
        <select 
          name="swiftCode"  
          value={formData.swiftCode}  
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="">Select SWIFT Code</option>
          <option value="CIBKJPJT">Mizuho Bank, Ltd. Japan</option>
          <option value="BOFAGB22">Bank of America, London, United Kingdom</option>
          <option value="CHASUS33">J.P. Morgan Chase Bank, USA</option>
          <option value="DEUTDEFF">Deutsche Bank AG, Germany</option>
          <option value="HSBCUS33">HSBC Bank, USA</option>
          <option value="BAMLUS33">Bank of America, USA</option>
          <option value="CITIUS33">Citibank, USA</option>
          <option value="RABONL2U">Raboobank, Netherlands</option>
          <option value="BARCGB22">Barclays Bank PLC, United Kingdom</option>
          <option value="ANZBAU3M">Australia and New Zealand Banking Group Limited, Australia</option>
        </select>
      </div>

        <div className="select-wrapper">
        <select 
          name="currency"  
          value={formData.currency}  
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="">Currency</option>
          <option value="Rands">Rands</option>
          <option value="American Dollar">American Dollar</option>
          <option value="Pound">Pound</option>
          <option value="Australian Dollar">Australian Dollar</option>
          <option value="Japanese Yen">Japanese Yeny</option>
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
