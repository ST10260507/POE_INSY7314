const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addDetails } = require("../controllers/detailsController");

// POST /api/details -> save user banking details
router.post("/", protect, addDetails);

module.exports = router;
