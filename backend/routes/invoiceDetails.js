const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all invoice details
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM invoice_details";
    const [results] = await db.query(query);
    res.json(results);
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get invoice details by invoice_id
router.get("/:invoiceId", async (req, res) => {
  try {
    const query = "SELECT * FROM invoice_details WHERE invoice_id = ?";
    const [results] = await db.query(query, [req.params.invoiceId]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Invoice details not found" });
    }

    res.json(results);
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
