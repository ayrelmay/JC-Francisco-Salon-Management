const express = require("express");
const db = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query to find the user by email and password
    const [users] = await db.query(
      "SELECT ID, name, email, role, status FROM employee WHERE email = ? AND password = ?",
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // Check if user is available
    if (user.status !== "available") {
      return res.status(403).json({
        success: false,
        message: "Account is currently not active",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.ID, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user data and token
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.ID,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
