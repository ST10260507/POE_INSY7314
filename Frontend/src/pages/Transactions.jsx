// src/pages/Transactions.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import "./Transactions.css"; // import the CSS file

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions"); // backend route
      setTransactions(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleApprove = async (id) => {
    try {
      await API.put(`/transactions/${id}/approve`);
      fetchTransactions(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/transactions/${id}/reject`);
      fetchTransactions(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="transactions-container">
      <h2>Transactions</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.userId.fullName || tx.userId.email}</td>
              <td>${tx.amount}</td>
              <td>{tx.description}</td>
              <td>{tx.status}</td>
              <td>
                {tx.status === "pending" && (
                  <>
                    <button onClick={() => handleApprove(tx._id)}>Approve</button>
                    <button onClick={() => handleReject(tx._id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
