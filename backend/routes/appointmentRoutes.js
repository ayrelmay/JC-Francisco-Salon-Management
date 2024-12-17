const express = require("express");
const db = require("../db");
const router = express.Router();

// Fetch all appointments
router.get("/", async (req, res) => {
  try {
    const [appointments] = await db.query(`
      SELECT 
        id,
        full_name,
        email,
        mobile_number,
        appointment_date,
        appointment_time,
        status,
        stylist_id,
        created_at,
        updated_at
      FROM appointments
    `);

    if (!appointments) {
      console.error("No appointments found");
      return res.status(404).json({ error: "No appointments found" });
    }

    console.log("Raw appointments data:", appointments); // Debug log

    const formattedAppointments = appointments.map((appointment) => {
      if (!appointment.AppointmentDate) {
        return appointment;
      }

      return {
        ...appointment,
        AppointmentDate:
          appointment.AppointmentDate.toISOString().split("T")[0],
      };
    });

    console.log("Formatted appointments:", formattedAppointments);
    res.status(200).json(formattedAppointments);
  } catch (err) {
    console.error("Detailed error:", err);
    res.status(500).json({
      error: "Failed to retrieve appointments",
      details: err.message,
    });
  }
});

// Fetch specific appointment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [appointment] = await db.query(
      "SELECT * FROM appointments WHERE id = ?",
      [id]
    );

    if (appointment.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(appointment[0]);
  } catch (err) {
    console.error("Error fetching specific appointment:", err);
    res.status(500).json({
      error: "Failed to retrieve appointment",
      details: err.message,
    });
  }
});

// Update specific appointment by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { appointment_date, appointment_time, stylist_id } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE appointments SET appointment_date = ?, appointment_time = ?, stylist_id = ? WHERE id = ?",
      [appointment_date, appointment_time, stylist_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Fetch and return the updated appointment
    const [updated] = await db.query(
      "SELECT * FROM appointments WHERE id = ?",
      [id]
    );

    res.status(200).json(updated[0]);
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({
      error: "Failed to update appointment",
      details: err.message,
    });
  }
});

// Add this new PATCH endpoint for updating appointment status
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE appointments SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Fetch and return the updated appointment
    const [updated] = await db.query(
      "SELECT * FROM appointments WHERE id = ?",
      [id]
    );

    res.status(200).json(updated[0]);
  } catch (err) {
    console.error("Error updating appointment status:", err);
    res.status(500).json({
      error: "Failed to update appointment status",
      details: err.message,
    });
  }
});

module.exports = router;
