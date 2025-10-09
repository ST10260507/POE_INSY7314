const mongoose = require("mongoose");

const swiftCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  bankName: { type: String, required: true },
  country: { type: String, required: true },
});

const detailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  fullName: { type: String, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  currency: { type: String, enum: ["Rands", "American Dollar", "Pound", "Australian Dollar", "Japanese Yen"], default: "Rands" },
  accountType: { type: String, enum: ["checking", "savings"], default: "checking" },
  swiftCode: { type: String, enum: ["CIBKJPJT", "BOFAGB22", "CHASUS33", "DEUTDEFF", "HSBCUS33", "BAMLUS33", "CITIUS33", "RABONL2U", "BARCGB22", "ANZBAU3M"] }, //Mizuho Bank, Ltd. Japan ; Bank of America, London. United Kingdom
  cardNumber: { type: String },
  expirationDate: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

detailsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.accountNumber) obj.accountNumber = obj.accountNumber.slice(-4).padStart(obj.accountNumber.length, "*");
  if (obj.cardNumber) obj.cardNumber = obj.cardNumber.slice(-4).padStart(obj.cardNumber.length, "*");
  return obj;
};

const Details = mongoose.model("TransactionDetails", detailsSchema);
const SwiftCode = mongoose.model("SwiftCode", swiftCodeSchema);

module.exports = { Details, SwiftCode };