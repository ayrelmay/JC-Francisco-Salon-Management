const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all inventory items
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        Name as name,
        Category as category,
        Quantity as quantity,
        Status as status
      FROM inventory 
      WHERE archived = 0
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Error fetching inventory items" });
  }
});

module.exports = router;
