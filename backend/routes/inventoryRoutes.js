const express = require("express");
const router = express.Router();
const db = require("../db");

// Get next available ID - MOVE THIS ROUTE TO THE TOP
router.get("/next-id", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id FROM inventory ORDER BY id DESC LIMIT 1`
    );

    let nextId = "ITM-0001";
    if (rows.length > 0) {
      const lastId = rows[0].id;
      const numPart = parseInt(lastId.split("-")[1]);
      nextId = `ITM-${String(numPart + 1).padStart(4, "0")}`;
    }

    res.json({ nextId });
  } catch (error) {
    console.error("Error getting next ID:", error);
    res.status(500).json({ message: "Error getting next ID" });
  }
});

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

// Get specific inventory item by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
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
      WHERE id = ?
    `,
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Error fetching inventory item" });
  }
});

// Update inventory item
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity } = req.body;

  console.log("Received update request:", { id, name, category, quantity });

  try {
    // Determine status based on quantity
    let status = "In Stock";
    if (quantity === 0) {
      status = "Out of Stock";
    } else if (quantity <= 5) {
      status = "Low Stock";
    }

    const [result] = await db.query(
      `UPDATE inventory 
       SET Name = ?, Category = ?, Quantity = ?, Status = ?
       WHERE id = ?`,
      [name, category, quantity, status, id]
    );

    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(500).json({ message: "Error updating inventory item" });
  }
});

// Archive inventory item
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

// Add new inventory item
router.post("/", async (req, res) => {
  const { id, name, category, quantity } = req.body;

  try {
    // Determine initial status based on quantity
    let status = "In Stock";
    if (quantity === 0) {
      status = "Out of Stock";
    } else if (quantity <= 5) {
      status = "Low Stock";
    }

    const [result] = await db.query(
      `INSERT INTO inventory (id, Name, Category, Quantity, Status, archived) 
       VALUES (?, ?, ?, ?, ?, 0)`,
      [id, name, category, quantity, status]
    );

    res.status(201).json({
      message: "Item added successfully",
      itemId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding inventory item:", error);
    res.status(500).json({ message: "Error adding inventory item" });
  }
});

module.exports = router;
