import { useEffect, useState } from "react";
import API from "../services/api";
import "./Summary.css";

export default function Summary() {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestTransaction = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        // Fetch latest transaction for current user
        const res = await API.get("/transactions/latest", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTransaction(res.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load transaction summary."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTransaction();
  }, []);

  if (loading) return <p className="loading-text">Loading summary...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!transaction) return <p className="no-data">No recent transactions found.</p>;

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h2 className="summary-title">Transaction Summary</h2>
        <div className="summary-content">
          <p><strong>Transaction ID:</strong> {transaction._id}</p>
          <p><strong>User:</strong> {transaction.userId?.fullName || "N/A"}</p>
          <p><strong>Amount:</strong> ${transaction.amount}</p>
          <p><strong>Description:</strong> {transaction.description}</p>
          <p><strong>Status:</strong> 
            <span className={`status ${transaction.status}`}>{transaction.status}</span>
          </p>
          <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
        </div>

        <div className="summary-footer">
          <p> Your transaction has been submitted successfully!</p>
        </div>
      </div>
    </div>
  );
}
