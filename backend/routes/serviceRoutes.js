const express = require("express");
const db = require("../db");

const router = express.Router(); // Create a router instance

// Fetch all services
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM service");
    res.json(results);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

module.exports = router; // Export the router
