const express = require("express");
const db = require("../db"); // Import the database connection

const router = express.Router();

// Fetch all services
router.get("/", async (req, res) => {
  try {
    const [services] = await db.query("SELECT * FROM service");
    res.status(200).json(services);
  } catch (err) {
    console.error("Error fetching services:", err.message);
    res.status(500).json({ error: "Failed to retrieve services" });
  }
});

// Fetch the next Service ID
// router.get("/next-id", async (req, res) => {
//   try {
//     const [lastService] = await db.query(
//       "SELECT Id FROM service ORDER BY Id DESC LIMIT 1"
//     );
//     const lastId = lastService.length > 0 ? lastService[0].Id : "SRV-1000";
//     const nextId = `SRV-${String(
//       parseInt(lastId.split("-")[1], 10) + 1
//     ).padStart(4, "0")}`;
//     res.status(200).json({ nextId });
//   } catch (err) {
//     console.error("Error fetching next Service ID:", err.message);
//     res.status(500).json({ error: "Failed to fetch next Service ID" });
//   }
// });

router.get("/next-id", async (req, res) => {
  try {
    // Query the last inserted ID from the database
    const [rows] = await db.query(
      "SELECT Id FROM service ORDER BY Id DESC LIMIT 1"
    );

    // Check if any services exist in the table
    if (rows.length === 0 || !rows[0].Id) {
      // If the table is empty, start with SRV-1000
      return res.status(200).json({ nextId: "SRV-1000" });
    }

    const lastId = rows[0].Id; // Example: "SRV-1000"

    // Split and validate the format
    const parts = lastId.split("-");
    if (parts.length !== 2 || isNaN(parseInt(parts[1], 10))) {
      // Handle unexpected formats
      return res.status(200).json({ nextId: "SRV-1000" });
    }

    // Extract the numeric part, increment, and format the next ID
    const lastNumber = parseInt(parts[1], 10); // Extract "1000"
    const nextNumber = lastNumber + 1; // Increment to "1001"
    const nextId = `SRV-${String(nextNumber).padStart(4, "0")}`; // Format as "SRV-1001"

    res.status(200).json({ nextId }); // Respond with the next ID
  } catch (err) {
    console.error("Error fetching next Service ID:", err.message);
    res.status(500).json({ error: "Failed to fetch next Service ID" });
  }
});

// Add a new service
router.post("/", async (req, res) => {
  const { ServiceName, ServicePrice, Duration, Category } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO service (ServiceName, ServicePrice, Duration, Category) VALUES (?, ?, ?, ?)",
      [ServiceName, ServicePrice, Duration, Category]
    );
    res.status(201).json({
      message: "Service added successfully",
      serviceId: result.insertId,
    });
  } catch (err) {
    console.error("Error adding service:", err.message);
    res.status(500).json({ error: "Failed to add service" });
  }
});

module.exports = router;
