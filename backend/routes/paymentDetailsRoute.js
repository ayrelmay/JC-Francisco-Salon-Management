const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all payment details
router.get("/", async (req, res) => {
  try {
    const [details] = await db.query("SELECT * FROM paymentdetails");
    res.json(details);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Error fetching payment details" });
  }
});

// Get payment details by payment ID
router.get("/bypayment/:paymentId", async (req, res) => {
  try {
    const [details] = await db.query(
      "SELECT pd.*, s.ServiceName FROM paymentdetails pd LEFT JOIN service s ON pd.ServiceId = s.Id WHERE pd.PaymentId = ?",
      [req.params.paymentId]
    );

    console.log("Payment Details Query Result:", details); // Debug log
    res.json(details);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Error fetching payment details" });
  }
});

// Get payment details by ID
router.get("/:id", async (req, res) => {
  try {
    const [details] = await db.query(
      "SELECT * FROM paymentdetails WHERE Id = ?",
      [req.params.id]
    );

    if (details.length === 0) {
      return res.status(404).json({ message: "Payment details not found" });
    }

    res.json(details[0]);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Error fetching payment details" });
  }
});

module.exports = router;
