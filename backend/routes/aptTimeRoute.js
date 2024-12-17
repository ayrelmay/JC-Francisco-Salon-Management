const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();

// Fetch all appointment times
router.get("/", async (req, res) => {
  try {
    // Query to fetch all appointment times
    const [appointments] = await db.query("SELECT * FROM appointment_time");

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointment times:", err.message);
    res.status(500).json({ error: "Failed to retrieve appointment times" });
  }
});

// Fetch the next available ID (increment logic)
router.get("/next-id", async (req, res) => {
  try {
    // Query to find the last inserted ID
    const [rows] = await db.query(
      "SELECT Id FROM appointment_time ORDER BY Id DESC LIMIT 1"
    );

    let nextId = 1; // Default ID if table is empty

    if (rows.length > 0 && rows[0].Id) {
      nextId = rows[0].Id + 1; // Increment ID by 1
    }

    res.status(200).json({ nextId });
  } catch (err) {
    console.error("Error fetching next appointment ID:", err.message);
    res.status(500).json({ error: "Failed to fetch next ID" });
  }
});

// Add a new appointment time
router.post("/", async (req, res) => {
  const { Time } = req.body;

  if (!Time) {
    return res.status(400).json({ error: "Time is required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO appointment_time (Time) VALUES (?)",
      [Time]
    );

    res.status(201).json({
      message: "Appointment time added successfully",
      id: result.insertId,
      time: Time,
    });
  } catch (err) {
    console.error("Error adding appointment time:", err.message);
    res.status(500).json({ error: "Failed to add appointment time" });
  }
});

// Fetch a specific appointment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM appointment_time WHERE Id = ?",
      [id]
    );

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: "Appointment time not found" });
    }
  } catch (err) {
    console.error("Error fetching appointment time:", err.message);
    res.status(500).json({ error: "Failed to retrieve appointment time" });
  }
});

module.exports = router;
