const mongoose = require("mongoose");

// Schema for user's banking/transaction details
const detailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to a specific user
  fullName: { type: String, required: true }, // account holder name
  bankName: { type: String, required: true }, // bank name
  accountNumber: { type: String, required: true }, // store securely, consider encryption
  accountType: { type: String, enum: ["checking", "savings"], default: "checking" },
  swiftocde: { type: String }, // optional, depending on banking system
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

const transactionSchema = new mongoose.Schema({
  fullName: String,
  bankName: String,
  accountNumber: String,
  accountType: String,
  swiftcode: String,
  cardNumber: String,
  expirationDate: String,
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // Add transactions as an array of subdocuments
  transactions: [transactionSchema],
});

module.exports = mongoose.model("User", userSchema);

module.exports = mongoose.model("Details", detailsSchema);
