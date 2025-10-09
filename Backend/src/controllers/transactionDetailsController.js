//src/controllers/transactionDetailsController.js
const User = require("../models/User");
const Transaction = require("../models/TransactionDetails");


//ensure this matches the TransactionDetails model class
exports.addTransaction = async (req, res) => {
  try {
    const {
      userId,
      fullName,
      bankName,
      accountNumber,
      accountType,
      swiftcode,
      cardNumber,
      status,
      expirationDate,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // create a transaction object
    const transaction = {
      userId,
      fullName,
      bankName,
      accountNumber,
      accountType,
      swiftcode,
      cardNumber,
      status,
      expirationDate,
    };

    // push to user's transactions array
    user.transactions.push(transaction);
    await user.save();

    res.status(201).json({
      message: "Transaction saved successfully",
      transaction,
    });
  } catch (err) {
    console.error("Error saving transaction:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }

  // Get all transactions (for employers/admin)
  exports.getAllTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find().populate("userId", "accountNumber fullName");
      res.json(transactions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };


  // Approve a transaction
  exports.approveTransaction = async (req, res) => {
    try {
      const transaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        { status: "approved" },
        { new: true }
      );
      res.json(transaction);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Reject a transaction
  exports.rejectTransaction = async (req, res) => {
    try {
      const transaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        { status: "rejected" },
        { new: true }
      );
      res.json(transaction);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

};