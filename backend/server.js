const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const serviceRoutes = require("./routes/serviceRoutes"); // Import service routes
const paymentRoutes = require("./routes/paymentRoutes"); // Import payment routes
const paymentDetailsRoutes = require("./routes/paymentDetailsRoute"); // Import payment details routes
const appointmentRoutes = require("./routes/appointmentRoutes"); // Import appointment routes
const apptServicesRoutes = require("./routes/apptServicesRoutes");
const aptTimeRoute = require("./routes/aptTimeRoute");
const employeeRoutes = require("./routes/employeeRoute");
const invoiceDetailsRoutes = require("./routes/invoiceDetailsRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const revenueRoutes = require("./routes/revenueRoute");
const authRoutes = require("./routes/authRoutes"); // Add this line

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/service", serviceRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/paymentdetails", paymentDetailsRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/apptservices", apptServicesRoutes);
app.use("/api/appointment_time", aptTimeRoute);
app.use("/api/employee", employeeRoutes);
app.use("/api/invoicedetails", invoiceDetailsRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/auth", authRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
