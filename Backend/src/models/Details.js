const mongoose = require("mongoose");

const swiftCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // The actual SWIFT/BIC code (e.g., "CHASUS33")
  bankName: { type: String, required: true }, // The human-readable bank name/description (e.g., "J.P. Morgan Chase Bank, N.A.")
  country: { type: String, required: true }, // Country (e.g., "USA")
  // You might want to pre-populate this collection when your app starts.
});

// --- 2. Details Schema (User's Chosen Bank Account) ---
// This schema is modified to only store the *single* Swift code the user selected.
const detailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to a specific user
  fullName: { type: String, required: true }, // account holder name
  bankName: { type: String, required: true }, // bank name (can be redundant if using SwiftCode, but often useful)
  accountNumber: { type: String, required: true }, // store securely, consider encryption
  accountType: { type: String, enum: ["checking", "savings"], default: "checking" },
  // ⭐️ MODIFIED: Now stores the single selected Swift code (string)
  swiftCode: { type: String }, // The single SWIFT/BIC code selected by the user
  cardNumber: { type: String }, // optional, store only if necessary
  expirationDate: { type: String }, // optional, for cards
  createdAt: { type: Date, default: Date.now }
});

// Optional: mask sensitive fields when returning JSON
detailsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.accountNumber) {
    obj.accountNumber = obj.accountNumber.slice(-4).padStart(obj.accountNumber.length, "*");
  }
  if (obj.cardNumber) {
    obj.cardNumber = obj.cardNumber.slice(-4).padStart(obj.cardNumber.length, "*");
  }
  return obj;
};

// --- 3. Transaction Schema (Individual Transaction Record) ---
const transactionSchema = new mongoose.Schema({
  // ⭐️ ADDED: Amount to the transaction
  amount: { type: Number, required: true, min: 0 }, 
  fullName: String,
  bankName: String,
  accountNumber: String,
  accountType: String,
  swiftcode: String, // The Swift code used for this specific transaction
  cardNumber: String,
  expirationDate: String,
  createdAt: { type: Date, default: Date.now },
});

// --- 4. User Schema ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // Add transactions as an array of subdocuments
  transactions: [transactionSchema],
});

// Export the Models
const User = mongoose.model("User", userSchema);
const Details = mongoose.model("Details", detailsSchema);
const SwiftCode = mongoose.model("SwiftCode", swiftCodeSchema);

module.exports = { User, Details, SwiftCode };

// const mongoose = require("mongoose");

// // Schema for user's banking/transaction details
// const detailsSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to a specific user
//   fullName: { type: String, required: true }, // account holder name
//   bankName: { type: String, required: true }, // bank name
//   accountNumber: { type: String, required: true }, // store securely, consider encryption
//   accountType: { type: String, enum: ["checking", "savings"], default: "checking" },
//   swiftocde: { type: String }, // optional, depending on banking system
//   cardNumber: { type: String }, // optional, store only if necessary
//   expirationDate: { type: String }, // optional, for cards
//   createdAt: { type: Date, default: Date.now }
// });

// // Optional: mask sensitive fields when returning JSON
// detailsSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   if (obj.accountNumber) {
//     obj.accountNumber = obj.accountNumber.slice(-4).padStart(obj.accountNumber.length, "*");
//   }
//   if (obj.cardNumber) {
//     obj.cardNumber = obj.cardNumber.slice(-4).padStart(obj.cardNumber.length, "*");
//   }
//   return obj;
// };

// const transactionSchema = new mongoose.Schema({
//   fullName: String,
//   bankName: String,
//   accountNumber: String,
//   accountType: String,
//   swiftcode: String,
//   cardNumber: String,
//   expirationDate: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   // Add transactions as an array of subdocuments
//   transactions: [transactionSchema],
// });

// module.exports = mongoose.model("User", userSchema);

// module.exports = mongoose.model("Details", detailsSchema);
