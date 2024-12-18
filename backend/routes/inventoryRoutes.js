const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all inventory items with optional archived filter
router.get("/", async (req, res) => {
  const archived = req.query.archived === "1"; // Check if archived filter is applied
  try {
    const [rows] = await db.query(
      `
      SELECT 
        id,
        Name as name,
        Category as category,
        Quantity as quantity,
        Status as status
      FROM inventory 
      WHERE archived = ?
    `,
      [archived ? 1 : 0]
    ); // Use 1 for archived, 0 for not archived
    res.json(rows);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Error fetching inventory items" });
  }
});

// Add route to archive an inventory item
router.put("/archive/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`UPDATE inventory SET archived = 1 WHERE id = ?`, [id]);
    res.status(200).json({ message: "Item archived successfully" });
  } catch (error) {
    console.error("Error archiving item:", error);
    res.status(500).json({ message: "Error archiving item" });
  }
});

module.exports = router;
