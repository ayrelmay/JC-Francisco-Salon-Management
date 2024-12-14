const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();

// GET all paymentsdetails
router.get("/", async (req, res) => {
  try {
    const [payments] = await db.query("SELECT * FROM paymentdetails");
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err.message);
    res.status(500).json({ error: "Failed to retrieve payments" });
  }
});

// GET payment details by payment ID
router.get("/:paymentId", async (req, res) => {
  try {
    const [details] = await db.query(
      `SELECT pd.*, s.ServiceName, s.ServicePrice, s.Category 
       FROM paymentdetails AS pd
       JOIN service AS s ON pd.ServiceId = s.Id
       WHERE pd.PaymentId = ?`,
      [req.params.paymentId]
    );
    res.status(200).json(details);
  } catch (err) {
    console.error("Error fetching payment details:", err.message);
    res.status(500).json({ error: "Failed to retrieve payment details" });
  }
});

// Add this route handler
router.post("/save/:paymentId", async (req, res) => {
  try {
    const { services } = req.body;
    const paymentId = req.params.paymentId;

    // First delete existing services for this payment
    await db.query("DELETE FROM paymentdetails WHERE PaymentId = ?", [
      paymentId,
    ]);

    // Insert new services
    for (const service of services) {
      await db.query(
        "INSERT INTO paymentdetails (PaymentId, ServiceId, Price) VALUES (?, ?, ?)",
        [paymentId, service.id, service.price]
      );
    }

    res.status(200).json({ message: "Services saved successfully" });
  } catch (err) {
    console.error("Error saving payment details:", err);
    res.status(500).json({ error: "Failed to save services" });
  }
});

module.exports = router;
