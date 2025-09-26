import { useEffect, useState } from "react";
import API from "../services/api";
import "./Summary.css";

export default function Summary() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const res = await API.get("/auth/details", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDetails(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message || "Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) return <p>Loading your details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!details) return <p>No details found.</p>;

  return (
    <div className="summary-container">
      <h2>Your Banking Details</h2>
      <p><strong>Full Name:</strong> {details.fullName}</p>
      <p><strong>Bank Name:</strong> {details.bankName}</p>
      <p><strong>Account Number:</strong> {details.accountNumber}</p>
      <p><strong>Account Type:</strong> {details.accountType}</p>
      {details.routingNumber && <p><strong>Routing Number:</strong> {details.routingNumber}</p>}
      {details.cardNumber && <p><strong>Card Number:</strong> {details.cardNumber}</p>}
      {details.expirationDate && <p><strong>Card Expiration:</strong> {details.expirationDate}</p>}
    </div>
  );
}
