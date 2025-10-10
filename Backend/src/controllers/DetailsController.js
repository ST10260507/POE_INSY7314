// src/controllers/DetailsController.js
const Details = require("../models/Details");
const User = require("../models/User"); // Assuming you have a User model for relationship

// ==========================================================
// CLIENT ACTIONS
// ==========================================================

// Ensure this matches the Details model class
exports.addDetails = async (req, res) => {
    try {
        // req.user is attached by the 'protect' middleware
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: User ID missing" });
        }
        
        // Destructure fields from the request body
        const {
            fullName, // This field is sent by the frontend form
            bankName,
            accountNumber,
            accountType,
            swiftCode,
            cardNumber,
            amount,
            currency,
            expirationDate,
        } = req.body;

        // Create the transaction object
        const detail = await Details.create({
            // Use the logged-in user's ID for the payee field
            payee: req.user.id, 
            FullName: fullName, // Assuming you updated the Model to include this field
            bankName,
            accountNumber,
            accountType,
            swiftCode,
            cardNumber,
            // Status defaults to 'pending' in the schema, no need to set here
            amount,
            currency,
            expirationDate,
        });

        res.status(201).json({
            message: "Transaction saved successfully",
            detail, // Return 'detail', as 'transaction' is undefined
        });
    } catch (err) {
        console.error("Error saving transaction:", err);
        // Provide better feedback for validation errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation failed.", error: err.message });
        }
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// list published posts (all roles)
exports.listDetails = async (req, res) => {
    try {
        // Changed status filter to retrieve ALL details for general display, 
        // as the current listDetails is not protected by roles.
        const details = await Details.find() 
            .populate("payee", "fullName email"); // Populate user name and email
        res.json(details);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// view one published post (all roles)
exports.getDetail = async (req, res) => {
    try {
        const { detailsId } = req.params; // Corrected to match URL parameter name
        const detail = await Details.findById(detailsId).populate("payee", "fullName email");
        
        // Removed status check, allowing anyone to view the details if they have the ID
        if (!detail) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.json(detail);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// ==========================================================
// ADMIN ACTIONS (Require 'admin' middleware)
// ==========================================================

// Approve a transaction
exports.approveTransaction = async (req, res) => {
    try {
        // Ensure you use the correct model name 'Details'
        const detail = await Details.findByIdAndUpdate(
            req.params.id,
            { status: "approved" },
            { new: true }
        );
        if (!detail) {
             return res.status(404).json({ message: "Transaction not found" });
        }
        res.json(detail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Reject a transaction
exports.rejectTransaction = async (req, res) => {
    try {
        // Ensure you use the correct model name 'Details'
        const detail = await Details.findByIdAndUpdate(
            req.params.id,
            { status: "rejected" },
            { new: true }
        );
         if (!detail) {
             return res.status(404).json({ message: "Transaction not found" });
        }
        res.json(detail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

    
};