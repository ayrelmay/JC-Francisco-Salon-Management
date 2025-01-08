const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();

// GET all payments
router.get("/", async (req, res) => {
  try {
    const [payments] = await db.query(
      `SELECT Id,
              CustomerName,
              BeautyTech,
              ChairNumber,
              TotalAmount,
              TotalTime,
              AdditionalFee,
              AmountPaid,
              Status,
              (AmountPaid - TotalAmount) as ChangeGiven
       FROM payments`
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
      `SELECT id, customername, beautytech, chairnumber, totalamount, 
              totaltime, additionalfee, amountpaid, status,
              (amountpaid - totalamount) as changegiven
       FROM payments 
       WHERE id = ?`,
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

// POST new payment
router.post("/", async (req, res) => {
  try {
    const {
      CustomerName,
      BeautyTech,
      ChairNumber,
      TotalAmount,
      AdditionalFee,
      AmountPaid,
      ChangeGiven,
    } = req.body;

    // Insert the new payment
    const [result] = await db.query(
      `INSERT INTO payments (
        CustomerName,
        BeautyTech,
        ChairNumber,
        TotalAmount,
        AdditionalFee,
        AmountPaid,
        ChangeGiven,
        Status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        CustomerName,
        BeautyTech,
        ChairNumber,
        TotalAmount,
        AdditionalFee,
        AmountPaid,
        ChangeGiven,
      ]
    );

    // Return the new payment ID
    res.status(201).json({
      message: "Payment created successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Error creating payment:", err.message);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

// Update the PUT route to include status update
router.put("/:id", async (req, res) => {
  try {
    const {
      CustomerName,
      BeautyTech,
      ChairNumber,
      TotalAmount,
      AdditionalFee,
      AmountPaid,
      ChangeGiven,
      Status,
    } = req.body;

    await db.query(
      `UPDATE payments 
       SET CustomerName = ?,
           BeautyTech = ?,
           ChairNumber = ?,
           TotalAmount = ?, 
           AdditionalFee = ?, 
           AmountPaid = ?, 
           ChangeGiven = ?,
           Status = ?  
       WHERE Id = ?`,
      [
        CustomerName,
        BeautyTech,
        ChairNumber,
        TotalAmount,
        AdditionalFee,
        AmountPaid,
        ChangeGiven,
        Status,
        req.params.id,
      ]
    );

    res.status(200).json({ message: "Payment updated successfully" });
  } catch (err) {
    console.error("Error updating payment:", err.message);
    res.status(500).json({ error: "Failed to update payment" });
  }
});

module.exports = router;
