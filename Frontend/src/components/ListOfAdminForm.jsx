// src/components/ListOfAdminForm.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import "../pages/ListOfAdmin.css"; // Import her CSS styling from pages folder

export default function ListOfAdmin() {
  const [listOfAdmin, setListOfAdmin] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListOfAdmin = async () => {
    try {
      // Use /auth/admins endpoint
      const res = await API.get("/auth/admins"); 
      
      // Backend returns { admins: [...] }
      setListOfAdmin(res.data.admins);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListOfAdmin();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Call delete endpoint
      await API.delete(`/auth/admins/${id}`);
      // Refresh the list after deletion
      fetchListOfAdmin();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete admin. You may need to implement the delete endpoint in the backend.");
    }
  };

  if (loading) return <p className="loading-message">Loading...</p>;

  return (
    <div className="listOfAdmin-container">
      <h2>List Of Admins</h2>
      <table className="listOfAdmin-table">
        <thead>
          <tr>
            <th>fullName</th>
            <th>idNumber</th>
            <th>accountNumber</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOfAdmin.map(tx => (
            <tr key={tx._id}>
              <td>{tx.fullName}</td>
              <td>{tx.idNumber}</td>
              <td>{tx.accountNumber}</td>
              <td>
                <button onClick={() => handleDelete(tx._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}