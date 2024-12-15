const express = require("express");
const db = require("../db");
const router = express.Router();

// Fetch first service connected to each appointment
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        appointments_services.appointment_id,
        appointments_services.service_id,
        service.ServiceName as service_name,
        service.Category as category
      FROM appointments_services
      JOIN service ON appointments_services.service_id = service.Id
      WHERE appointments_services.id IN (
        SELECT MIN(id)
        FROM appointments_services
        GROUP BY appointment_id
      )
      ORDER BY appointments_services.appointment_id
    `);

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
