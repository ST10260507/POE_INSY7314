// src/components/DetailsForm.jsx
import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./DetailsForm.css";

const INITIAL_FORM_STATE = {
  // Maps to 'fullName' in the backend payload
  recipientFullName: "",
  amount: "",
  bankName: "",
  accountNumber: "",
  accountType: "checking",
  swiftCode: "",
  cardNumber: "",
  expirationDate: "",
  currency: "Rands",
};

export default function DetailsForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const { recipientFullName, amount, ...rest } = formData;

    // Construct the payload, mapping recipientFullName to 'fullName' 
    // and ensuring amount is a number for the database.
    const payload = {
        fullName: recipientFullName,
        amount: Number(amount),
        ...rest,
        // Optional fields are set to undefined if empty
        swiftCode: formData.swiftCode || undefined,
        cardNumber: formData.cardNumber || undefined,
        expirationDate: formData.expirationDate || undefined,
    };

    try {
      // Corrected endpoint path to match app.js setup: /api/details
      await API.post("/details", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });

      setMessage("Details submitted successfully! Redirecting...");

      setTimeout(() => {
        navigate("/home");
      }, 1500);

    } catch (err) {
      console.error("Submission error:", err.response?.data?.error || err.message);
      setMessage(
        err.response?.data?.message || err.response?.data?.error || "Failed to submit details. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = useMemo(() => [
    { name: "recipientFullName", type: "text", placeholder: "Full Name of Recipient", required: true },
    { name: "bankName", type: "text", placeholder: "Recipient Bank Name", required: true },
    { name: "amount", type: "number", placeholder: "Amount", required: true, min: "0.01" },
    { name: "accountNumber", type: "text", placeholder: "Account Number", required: true },
    { name: "cardNumber", type: "text", placeholder: "Card Number (Optional)", maxLength: 19 },
    { name: "expirationDate", type: "text", placeholder: "Card Expiration (MM/YY)", maxLength: 5 },
  ], []);

  return (
    <div className="details-form-container">
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
        name={field.name}
        placeholder={field.placeholder}
        value={formData[field.name]}
        onChange={handleChange}
        required={field.required}
        maxLength={field.maxLength}
        min={field.min}
        // CORRECTED: Removed the extra ': field.name'
        autoComplete={field.name.includes('card') ? 'cc-' + field.name : field.name}
        disabled={isSubmitting}
      />
))}

        {/* Account Type Select */}
        <div className="select-wrapper">
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
          <option value="">Select SWIFT Code (Optional)</option>
          <option value="CIBKJPJT">Mizuho Bank, Ltd. Japan</option>
          <option value="BOFAGB22">Bank of America, London, UK</option>
          <option value="CHASUS33">J.P. Morgan Chase Bank, USA</option>
          <option value="DEUTDEFF">Deutsche Bank AG, Germany</option>
          <option value="HSBCUS33">HSBC Bank, USA</option>
          <option value="BAMLUS33">Bank of America, USA</option>
          <option value="CITIUS33">Citibank, USA</option>
          <option value="RABONL2U">Raboobank, Netherlands</option>
          <option value="BARCGB22">Barclays Bank PLC, UK</option>
          <option value="ANZBAU3M">ANZ Banking Group, Australia</option>
        </select>
      </div>

        <div className="select-wrapper">
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="">Select Currency</option>
          <option value="Rands">Rands</option>
          <option value="American Dollar">American Dollar</option>
          <option value="Pound">Pound</option>
          <option value="Australian Dollar">Australian Dollar</option>
          <option value="Japanese Yen">Japanese Yen</option>
        </select>
      </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? "Submitting..." : "Submit Payment Details"}
        </button>
      </form>
    </div>
  );
}