const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();

// GET all payments
router.get("/", async (req, res) => {
  try {
    const [payments] = await db.query(
      "SELECT  `Id`,`CustomerName`, `BeautyTech`, `TotalAmount`, `TotalTime`, `Status` FROM payments"
    );
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err.message);
    res.status(500).json({ error: "Failed to retrieve payments" });
  }
});

module.exports = router;
