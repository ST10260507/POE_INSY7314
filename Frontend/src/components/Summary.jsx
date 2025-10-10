// src/pages/Summary.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import "./Summary.css";

export default function Summary() {
  // 💡 State variable renamed for clarity, though keeping 'detail' is optional
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        // 🛑 FIX 1: Changed API route to fetch the latest Detail for the current user.
        // NOTE: This assumes you implement a route in your backend like GET /api/details/latest
        const res = await API.get("/details/getDetail", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Use 'detail' to hold the response data
        setDetail(res.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load transaction summary. Please ensure the backend route /details/latest is implemented."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestDetail();
  }, []);

  if (loading) return <p className="loading-text">Loading summary...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!detail) return <p className="no-data">No recent transactions found.</p>;

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h2 className="summary-title">Transaction Submission Summary</h2>
        <div className="summary-content">
          <p><strong>Detail ID:</strong> {detail._id}</p>
          
          {/* Assuming payee is populated, otherwise it will just show the ID */}
          <p><strong>Submitted By (Payee):</strong> {detail.payee?.fullName || detail.payee?.email || "N/A"}</p>
          
          <hr />
          
          {/* 🛑 FIX 2: Using the correct fields from the Details model (recipientFullName, bankName, etc.) */}
          <p><strong>Recipient Name:</strong> {detail.recipientFullName}</p>
          <p><strong>Bank Name:</strong> {detail.bankName}</p>
          <p><strong>Account Type:</strong> {detail.accountType}</p>
          <p><strong>Account Number:</strong> {detail.accountNumber}</p>
          <p><strong>SWIFT Code:</strong> {detail.swiftCode || "N/A"}</p>
          
          <hr />
          
          <p>
            <strong>Amount:</strong> {detail.currency} {Number(detail.amount).toFixed(2)}
          </p>
          
          <p>
            <strong>Status:</strong> 
            <span className={`status ${detail.status}`}>{detail.status}</span>
          </p>
          <p><strong>Submission Date:</strong> {new Date(detail.createdAt).toLocaleString()}</p>
        </div>

        <div className="summary-footer">
          <p> Your payment details have been submitted successfully and are **pending approval**.</p>
        </div>
      </div>
    </div>
  );
}