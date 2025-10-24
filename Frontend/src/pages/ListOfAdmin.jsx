// src/pages/DetailsList.jsx
import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import "./ListOfAdmin.css"; // Reusing the CSS file

export default function ListOfAdminList() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListOfAdmin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/listOfAdmin"); 
      setDetails(res.data);
    } catch (err) {
      console.error("Error fetching details:", err.response?.data?.message || err.message);
      setError("Failed to fetch admin details. Check server connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListOfAdmin();
  }, [fetchListOfAdmin]);

  const handleDelete = async (id) => {
    try {
      await API.put(`/details/${id}/delete`); 
      fetchListOfAdmin(); // refresh list
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) return <p className="loading-message">Loading transaction details...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  // Check if details array is empty
  if (details.length === 0) return <p className="no-listOfAdmin">No pending Admin details found.</p>;

  return (
    <div className="listOfAdmin-container">
      <h2>Transaction Details for Approval</h2>
      <table className="listOfAdmin-table">
        <thead>
          <tr>
            <th>Admin</th>
            <th>Full Name</th>
            <th>ID Number</th>
            <th>Account Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOfAdmin.map((listOfAdmin) => (
            <tr key={listOfAdmin._id}>
              <td>{listOfAdmin.fullName || listOfAdmin.email || 'N/A'}</td>
              <td>{listOfAdmin.idNumber} {Number(listOfAdmin.idNumber).toFixed(2)}</td> 
              <td>{listOfAdmin.accountNumber}</td>
              <td>{listOfAdmin.status}</td>
              <td>
                {listOfAdmin.status === "pending" && (
                  <>
                    <button onClick={() => handleDelete(listOfAdmin._id)} className="delete-button">Delete</button>
                  </>
                )}
                {listOfAdmin.status !== "pending" && (
                    <span className={`status-badge status-${listOfAdmin.status}`}>{listOfAdmin.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}