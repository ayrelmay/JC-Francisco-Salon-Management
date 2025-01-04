const express = require("express");
const db = require("../db");
const router = express.Router();

// Validate phone number using E.164 format
const validatePhoneNumber = (number) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(number);
};

// Generate a unique Booking ID
const generateBookingID = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase();

// Create a new booking
router.post("/book", async (req, res) => {
  try {
    const {
      full_name,
      email,
      mobile_number,
      service,
      stylist_id,
      appointment_date,
      appointment_time,
    } = req.body;

    // Validate required fields
    if (
      !full_name ||
      !email ||
      !mobile_number ||
      !service ||
      !stylist_id ||
      !appointment_date ||
      !appointment_time
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate phone number format
    if (!validatePhoneNumber(mobile_number)) {
      return res.status(400).json({
        message:
          "Invalid phone number format. Use E.164 format (e.g., +639123456789).",
      });
    }

    const booking_id = generateBookingID();

    const [result] = await db.query(
      `INSERT INTO appointments 
       (booking_id, full_name, email, mobile_number, service, stylist_id, appointment_date, appointment_time, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        booking_id,
        full_name,
        email,
        mobile_number,
        service,
        stylist_id,
        appointment_date,
        appointment_time,
      ]
    );

    res.status(201).json({
      booking_id,
      message: "Booking created successfully!",
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({
      error: "Failed to create booking",
      details: err.message,
    });
  }
});

// Search for a booking
router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    const [results] = await db.query(
      `SELECT * FROM appointments 
       WHERE booking_id = ? OR email = ? OR mobile_number = ?`,
      [query, query, query]
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No booking found for this query." });
    }

    res.status(200).json(results[0]);
  } catch (err) {
    console.error("Error searching booking:", err);
    res.status(500).json({
      error: "Failed to search booking",
      details: err.message,
    });
  }
});

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

// Update booking details
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    mobile_number,
    email,
    stylist_id,
    service,
    appointment_time,
    appointment_date,
  } = req.body;

  if (
    !mobile_number ||
    !email ||
    !stylist_id ||
    !service ||
    !appointment_time ||
    !appointment_date
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!validatePhoneNumber(mobile_number)) {
    return res.status(400).json({
      message:
        "Invalid phone number format. Use E.164 format (e.g., +639123456789).",
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE appointments 
       SET mobile_number = ?, email = ?, stylist_id = ?, service = ?, 
           appointment_time = ?, appointment_date = ? 
       WHERE booking_id = ?`,
      [
        mobile_number,
        email,
        stylist_id,
        service,
        appointment_time,
        appointment_date,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Booking not found or could not be updated." });
    }

    res.status(200).json({ message: "Booking updated successfully." });
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({
      error: "Failed to update booking",
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

// Fetch appointment details with services
router.get("/details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        a.id AS appointment_id,
        a.full_name,
        a.email,
        a.mobile_number,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.stylist_id,
        s.service_id,
        srv.ServiceName as service_name,
        srv.Category as category
      FROM 
        appointments a
      LEFT JOIN 
        appointments_services s ON a.id = s.appointment_id
      LEFT JOIN
        service srv ON s.service_id = srv.Id
      WHERE 
        a.id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Format the result to group services under the same appointment
    const formatted = rows.reduce((acc, row) => {
      if (!acc) {
        acc = {
          appointment_id: row.appointment_id,
          full_name: row.full_name,
          email: row.email,
          mobile_number: row.mobile_number,
          appointment_date: row.appointment_date,
          appointment_time: row.appointment_time,
          status: row.status,
          stylist_id: row.stylist_id,
          services: [],
        };
      }
      if (row.service_id) {
        acc.services.push({
          service_id: row.service_id,
          service_name: row.service_name,
          category: row.category,
        });
      }
      return acc;
    }, null);

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Error fetching appointment details:", err);
    res.status(500).json({
      error: "Failed to retrieve appointment details",
      details: err.message,
    });
  }
});

module.exports = router;
