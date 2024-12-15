const express = require("express");
const db = require("../db");
const router = express.Router();

// Fetch all appointments services
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM appointments_services");

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No appointment services found" });
    }

    res.json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      error: "Failed to fetch appointments services",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

module.exports = router;
