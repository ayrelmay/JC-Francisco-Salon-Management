const express = require("express");
const db = require("../db");
const router = express.Router();

// Fetch all appointments
router.get("/", async (req, res) => {
  try {
    const [appointments] = await db.query("SELECT * FROM appointments");

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

module.exports = router;
