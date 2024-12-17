const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all invoices
router.get("/", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM invoice");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Error fetching invoices" });
  }
});

// Get invoice by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM invoice WHERE invoice_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ message: "Error fetching invoice" });
  }
});

module.exports = router;
