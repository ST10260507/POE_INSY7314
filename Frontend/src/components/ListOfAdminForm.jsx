// src/components/Transactions.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function ListOfAdmin() {
  const [listOfAdmin, setListOfAdmin] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListOfAdmin = async () => {
    try {
      const res = await API.get("/listOfAdmin"); // backend route
      setListOfAdmin(res.data);
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
      await API.put(`/listOfAdmin/${id}/delete`);
      fetchListOfAdmin(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>List Of Admins</h2>
      <table>
        <thead>
          <tr>
            {/* <th>User</th> */}
            <th>fullName</th>
            <th>idNumber</th>
            <th>accountNumber</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOfAdmin.map(tx => (
            <tr key={tx._id}>
              {/* <td>{tx.userId.fullName || tx.userId.email}</td> */}
              <td>${tx.fullName}</td>
              <td>{tx.idNumber}</td>
              <td>{tx.accountNummber}</td>
              <td>
                {(
                  <>
                    <button onClick={() => handleDelete(tx._id)}>Delete</button>
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
