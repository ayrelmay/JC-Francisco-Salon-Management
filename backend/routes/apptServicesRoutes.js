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

// Fetch specific appointment service by appointment_id
router.get("/:appointment_id", async (req, res) => {
  const { appointment_id } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        appointments_services.*,
        service.ServiceName as service_name,
        service.Category as category
      FROM appointments_services
      JOIN service ON appointments_services.service_id = service.Id
      WHERE appointments_services.appointment_id = ?
    `,
      [appointment_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Appointment service not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error fetching appointment service:", err);
    res.status(500).json({
      error: "Failed to retrieve appointment service",
      details: err.message,
    });
  }
});

// Update appointment service by appointment_id
router.put("/:appointment_id", async (req, res) => {
  const { appointment_id } = req.params;
  const { service_id } = req.body;

  try {
    // First check if the record exists
    const [existing] = await db.query(
      "SELECT * FROM appointments_services WHERE appointment_id = ?",
      [appointment_id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: "Appointment service not found" });
    }

    // Update the service using the first record's ID
    const [result] = await db.query(
      "UPDATE appointments_services SET service_id = ? WHERE appointment_id = ? LIMIT 1",
      [service_id, appointment_id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Failed to update appointment service" });
    }

    // Fetch and return the updated service
    const [updated] = await db.query(
      `
      SELECT 
        appointments_services.*,
        service.ServiceName as service_name,
        service.Category as category
      FROM appointments_services
      JOIN service ON appointments_services.service_id = service.Id
      WHERE appointments_services.appointment_id = ?
      LIMIT 1
    `,
      [appointment_id]
    );

    res.status(200).json(updated[0]);
  } catch (err) {
    console.error("Error updating appointment service:", err);
    res.status(500).json({
      error: "Failed to update appointment service",
      details: err.message,
    });
  }
});

module.exports = router;
