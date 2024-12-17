const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();

// Fetch all employees
router.get("/", async (req, res) => {
  try {
    const [employees] = await db.query("SELECT * FROM employee");
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err.message);
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
});

// Fetch the next available ID (increment logic)
router.get("/next-id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT ID FROM employee ORDER BY ID DESC LIMIT 1"
    );

    let nextId = 1; // Default ID if table is empty
    if (rows.length > 0 && rows[0].ID) {
      nextId = parseInt(rows[0].ID.match(/\d+/)[0]) + 1; // Increment numeric part
    }

    const formattedNextId = `EMP${nextId.toString().padStart(4, "0")}`;
    res.status(200).json({ nextId: formattedNextId });
  } catch (err) {
    console.error("Error fetching next employee ID:", err.message);
    res.status(500).json({ error: "Failed to fetch next ID" });
  }
});

// Add a new employee
router.post("/", async (req, res) => {
  const { name, email, password, role, status } = req.body;

  if (!name || !email || !password || !role || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO employee (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, role, status]
    );

    res.status(201).json({
      message: "Employee added successfully",
      id: result.insertId,
      name,
      email,
      role,
      status,
    });
  } catch (err) {
    console.error("Error adding employee:", err.message);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

// Fetch a specific employee by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM employee WHERE ID = ?", [id]);

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (err) {
    console.error("Error fetching employee:", err.message);
    res.status(500).json({ error: "Failed to retrieve employee" });
  }
});

module.exports = router;
