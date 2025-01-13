const express = require("express");
const router = express.Router();
const db = require("../db");

// GET route to fetch current revenue data
// backend/routes/revenueRoute.js
router.get("/", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const [rows] = await db.query("SELECT * FROM revenue WHERE date = ?", [
      today,
    ]);

    res.json(
      rows[0] || {
        opening_amount: "0.00",
        daily_revenue: "0.00",
        closing_amount: "0.00",
        customer_count: 0,
        transaction_id: null,
        date: today,
      }
    );
  } catch (error) {
    console.error("GET route error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT route to update revenue data
router.put("/", async (req, res) => {
  try {
    const {
      opening_amount,
      daily_revenue,
      closing_amount,
      customer_count,
      transaction_id,
    } = req.body;

    const today = new Date().toISOString().split("T")[0];

    // First check for existing record
    const [existingRecords] = await db.query(
      "SELECT id FROM revenue WHERE date = ?",
      [today]
    );

    let query;
    let params;

    if (existingRecords.length === 0) {
      query = `
        INSERT INTO revenue 
        (transaction_id, date, opening_amount, daily_revenue, closing_amount, customer_count) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      params = [
        transaction_id,
        today,
        opening_amount,
        daily_revenue,
        closing_amount,
        customer_count,
      ];
    } else {
      query = `
        UPDATE revenue 
        SET 
          opening_amount = ?,
          daily_revenue = ?,
          closing_amount = ?,
          customer_count = ?,
          transaction_id = ?
        WHERE date = ?
      `;
      params = [
        opening_amount,
        daily_revenue,
        closing_amount,
        customer_count,
        transaction_id,
        today,
      ];
    }

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      throw new Error("No rows were affected");
    }

    res.json({
      success: true,
      message:
        existingRecords.length === 0 ? "New record created" : "Record updated",
      data: {
        transaction_id,
        opening_amount,
        daily_revenue,
        closing_amount,
        customer_count,
        date: today,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save values",
      error: error.message,
    });
  }
});

module.exports = router;
