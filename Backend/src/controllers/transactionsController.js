const Transaction = require("../models/Transaction");

// Get all transactions (for employers/admin)
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("userId", "email fullName");
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
