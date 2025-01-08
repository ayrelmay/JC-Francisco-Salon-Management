const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();

// Fetch all employees with formatted data for AccountTable
router.get("/", async (req, res) => {
  try {
    const [employees] = await db.query(`
      SELECT 
        ID,
        name,
        role,
        email,
        status,
        CONCAT('Log, ', DATE_FORMAT(updatedAt, '%b %d %Y %h:%i %p')) as recentAct
      FROM employee
    `);

    // Format the status to match frontend expectations (capitalize first letter)
    const formattedEmployees = employees.map((emp) => ({
      ...emp,
      status: emp.status.charAt(0).toUpperCase() + emp.status.slice(1),
    }));

    res.status(200).json(formattedEmployees);
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
      // Extract the number from the existing ID and increment
      const currentNumber = parseInt(rows[0].ID.replace("EMP", ""));
      nextId = currentNumber + 1;
    }

    // Format with 4 digits (EMP0001, EMP0002, etc.)
    const formattedNextId = `EMP${String(nextId).padStart(4, "0")}`;
    res.status(200).json({ nextId: formattedNextId });
  } catch (err) {
    console.error("Error fetching next employee ID:", err.message);
    res.status(500).json({ error: "Failed to fetch next ID" });
  }
});

// Add a new employee
router.post("/", async (req, res) => {
  console.log("Received request body:", req.body);

  const { ID, name, email, password, role, status } = req.body;

  // Detailed validation logging
  const missingFields = [];
  if (!ID) missingFields.push("ID");
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (!role) missingFields.push("role");
  if (!status) missingFields.push("status");

  if (missingFields.length > 0) {
    const errorMessage = `Missing required fields: ${missingFields.join(", ")}`;
    console.error(errorMessage);
    return res.status(400).json({
      error: "All fields are required",
      details: errorMessage,
      receivedData: req.body,
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO employee (ID, name, email, password, role, status) VALUES (?, ?, ?, ?, ?, ?)",
      [ID, name, email, password, role, status]
    );

    console.log("Successfully inserted employee:", result);

    res.status(201).json({
      message: "Employee added successfully",
      id: ID,
      name,
      email,
      role,
      status,
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      error: "Failed to add employee",
      details: err.message,
    });
  }
});

// Move the technicians route BEFORE the /:id route
router.get("/technicians", async (req, res) => {
  try {
    const [technicians] = await db.query(
      "SELECT ID, name FROM employee WHERE role = 'technician' AND status = 'available'"
    );
    res.status(200).json(technicians);
  } catch (err) {
    console.error("Error fetching technicians:", err.message);
    res.status(500).json({ error: "Failed to retrieve technicians" });
  }
});

// Keep the specific ID route after more specific routes
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

// Add this route to your employeeRoute.js
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, status } = req.body;

  try {
    let query = "UPDATE employee SET name = ?, email = ?, role = ?, status = ?";
    let params = [name, email, role, status];

    // Only include password in update if it was provided
    if (password) {
      query += ", password = ?";
      params.push(password);
    }

    query += " WHERE ID = ?";
    params.push(id);

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("Error updating employee:", err.message);
    res.status(500).json({ error: "Failed to update employee" });
  }
});

module.exports = router;
