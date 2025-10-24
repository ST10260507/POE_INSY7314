// src/pages/Transactions.jsx
import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import "./Transactions.css"; // Reusing the CSS file

export default function DetailsList() {
  // Renamed state variables to reflect 'Details' data
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Updated function name and API route
  const fetchDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 🛑 FIX 1: Changed route from /transaction to /details
      const res = await API.get("/details"); 
      setDetails(res.data);
    } catch (err) {
      console.error("Error fetching details:", err.response?.data?.message || err.message);
      setError("Failed to fetch transaction details. Check server connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // Updated function names and API route endpoints
  const handleApprove = async (id) => {
    try {
      // 🛑 FIX 2: Corrected the PUT route path to match controller exports
      // Assuming your backend route is set up like: router.put('/:id/approve', ...)
      await API.put(`/details/${id}/approve`); 
      fetchDetails(); // refresh list
    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      // 🛑 FIX 3: Corrected the PUT route path
      await API.put(`/details/${id}/reject`); 
      fetchDetails(); // refresh list
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  if (loading) return <p className="loading-message">Loading transaction details...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  // Check if details array is empty
  if (details.length === 0) return <p className="no-transactions">No pending transaction details found.</p>;

  return (
    <div className="transactions-container">
      <h2>Transaction Details for Approval</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Client (Payee)</th>
            <th>Amount</th>
            <th>Bank Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail._id}>
              {/* Assuming payee is populated with user object { fullName, email } */}
              <td>{detail.payee?.fullName || detail.payee?.email || 'N/A'}</td>
              {/* Recipient name is stored in recipientFullName */}
              {/* <td>{detail.recipientFullName}</td>  */}
              {/* Currency is Rands by default from the form, showing a common format */}
              <td>{detail.currency} {Number(detail.amount).toFixed(2)}</td> 
              <td>{detail.bankName}</td>
              <td>{detail.status}</td>
              <td>
                {detail.status === "pending" && (
                  <>
                    <button onClick={() => handleApprove(detail._id)} className="approve-button">Approve</button>
                    <button onClick={() => handleReject(detail._id)} className="reject-button">Reject</button>
                  </>
                )}
                {detail.status !== "pending" && (
                    <span className={`status-badge status-${detail.status}`}>{detail.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}