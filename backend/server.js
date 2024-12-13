const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const serviceRoutes = require("./routes/serviceRoutes"); // Import service routes
const paymentRoutes = require("./routes/paymentRoutes"); // Import payment routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/service", serviceRoutes);
app.use("/api/payment", paymentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
