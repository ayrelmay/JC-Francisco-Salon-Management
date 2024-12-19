const express = require("express");
const router = express.Router();
const db = require("../db");

// Route to fetch all revenue records
router.get("/revenue", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM revenue ORDER BY date DESC LIMIT 1"
    );
    res.json(
      rows[0] || {
        opening_amount: "0.00",
        revenue: "0.00",
        closing_amount: "0.00",
        customers: "0",
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to reset daily values at midnight
router.post("/reset-daily", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    await db.query(
      `INSERT INTO revenue (date, opening_balance, revenue, closing, customers) 
       VALUES (?, '0.00', '0.00', '0.00', '0')`,
      [today]
    );
    res.json({ message: "Values reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update opening balance
router.put("/revenue/opening", async (req, res) => {
  try {
    const { opening_balance, transaction_id } = req.body;
    const today = new Date().toISOString().split("T")[0];

    // Insert or update the opening amount
    await db.query(
      `INSERT INTO revenue (transaction_id, date, opening_amount) 
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE opening_amount = ?`,
      [transaction_id, today, opening_balance, opening_balance]
    );

    res.json({
      message: "Opening balance updated successfully",
      transaction_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to fetch all revenue records
router.get("/revenue/all", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM revenue ORDER BY date DESC");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
