const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();

// GET all payments
router.get("/", async (req, res) => {
  try {
    const [payments] = await db.query(
      "SELECT  `Id`,`CustomerName`, `BeautyTech`, `TotalAmount`, `TotalTime`, `Status` FROM payments"
    );
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err.message);
    res.status(500).json({ error: "Failed to retrieve payments" });
  }
});

// GET specific payment by ID
router.get("/:id", async (req, res) => {
  try {
    const [payment] = await db.query(
      `SELECT Id, CustomerName, BeautyTech, ChairNumber, TotalAmount, 
              TotalTime, AdditionalFee, AmountPaid, Status,
              (AmountPaid - TotalAmount) as ChangeGiven
       FROM payments 
       WHERE Id = ?`,
      [req.params.id]
    );

    if (payment.length === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(payment[0]);
  } catch (err) {
    console.error("Error fetching payment:", err.message);
    res.status(500).json({ error: "Failed to retrieve payment" });
  }
});

// Add this PUT route to update payment
router.put("/:id", async (req, res) => {
  try {
    const { TotalAmount, AdditionalFee, AmountPaid, ChangeGiven } = req.body;

    await db.query(
      `UPDATE payments 
       SET TotalAmount = ?, 
           AdditionalFee = ?, 
           AmountPaid = ?, 
           ChangeGiven = ?
       WHERE Id = ?`,
      [TotalAmount, AdditionalFee, AmountPaid, ChangeGiven, req.params.id]
    );

    res.status(200).json({ message: "Payment updated successfully" });
  } catch (err) {
    console.error("Error updating payment:", err.message);
    res.status(500).json({ error: "Failed to update payment" });
  }
});

module.exports = router;
