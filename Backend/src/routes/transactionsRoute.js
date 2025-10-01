const express = require("express");
const router = express.Router();
const { protect, requireRole, ROLES } = require("../middleware/authMiddleware");
const {
  getAllTransactions,
  approveTransaction,
  rejectTransaction
} = require("../controllers/transactionsController");

// Employers/Admin can see all transactions
router.get("/", protect, requireRole(ROLES.ADMIN), getAllTransactions);

// Approve or reject transactions
router.put("/:id/approve", protect, requireRole(ROLES.ADMIN), approveTransaction);
router.put("/:id/reject", protect, requireRole(ROLES.ADMIN), rejectTransaction);

module.exports = router;
