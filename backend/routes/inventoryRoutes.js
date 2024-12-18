const express = require("express");
const router = express.Router();
const db = require("../db"); // Assuming you have a database connection configured

// Get all inventory items
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM inventory WHERE archived = 0");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Error fetching inventory items" });
  }
});

module.exports = router;
