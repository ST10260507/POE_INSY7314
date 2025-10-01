import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./DetailsForm.css";

export default function DetailsForm() {
  const [fullName, setFullName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [swiftcode, setswiftcode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await API.post("/auth/details", {
      //   fullName,
      //   bankName,
      //   accountNumber,
      //   accountType,
      //   swiftcode,
      //   cardNumber,
      //   expirationDate,
      // });
        await API.post("/details", {
          fullName,
          bankName,
          accountNumber,
          accountType,
          swiftcode,
          cardNumber,
          expirationDate,
        });

      setMessage("Details submitted successfully!");

      // Redirect to Summary page
      navigate("/summary");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to submit details");
    }
  };

  return (
    <form className="details-form" onSubmit={handleSubmit}>
      <h2>Enter Your Banking Details</h2>
      {message && <p>{message}</p>}

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Bank Name"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        required
      />
      <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
        <option value="checking">Checking</option>
        <option value="savings">Savings</option>
      </select>
      <input
        type="text"
        placeholder="Swift code"
        value={swiftcode}
        onChange={(e) => setswiftcode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Card Number (optional)"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Card Expiration (MM/YY)"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />

      <button type="submit">Submit Details</button>
    </form>
  );
}


// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import API from "../services/api";
// import "./DetailsForm.css";

// export default function DetailsForm() {
//   const [fullName, setFullName] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [accountType, setAccountType] = useState("checking");
//   const [swiftcode, setswiftcode] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expirationDate, setExpirationDate] = useState("");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send banking details to your backend
//       const res = await API.post("/auth/details", {
//         fullName,
//         bankName,
//         accountNumber,
//         accountType,
//         swiftcode,
//         cardNumber,
//         expirationDate,
//       });

//       setMessage("Details submitted successfully!");
//       // Optionally navigate somewhere after submission
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || "Failed to submit details");
//     }
//   };

//   return (
//     <form className="details-form" onSubmit={handleSubmit}>
//       <h2>Enter Your Banking Details</h2>
//       {location.state?.message && <p>{location.state.message}</p>}
      
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={fullName}
//         onChange={(e) => setFullName(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Bank Name"
//         value={bankName}
//         onChange={(e) => setBankName(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Account Number"
//         value={accountNumber}
//         onChange={(e) => setAccountNumber(e.target.value)}
//         required
//       />
//       <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
//         <option value="checking">Checking</option>
//         <option value="savings">Savings</option>
//       </select>
//       <input
//         type="text"
//         placeholder="Swift Code"
//         value={swiftcode}
//         onChange={(e) => setswiftcode(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Card Number (optional)"
//         value={cardNumber}
//         onChange={(e) => setCardNumber(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Card Expiration (MM/YY)"
//         value={expirationDate}
//         onChange={(e) => setExpirationDate(e.target.value)}
//       />

//       <button type="submit">Submit Details</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }
