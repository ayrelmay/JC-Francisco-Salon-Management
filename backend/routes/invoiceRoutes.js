const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all invoices
router.get("/", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const archived = req.query.archived === "1";

    const [rows] = await connection.query(
      "SELECT * FROM invoice WHERE archived = ?",
      [archived]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Error fetching invoices" });
  } finally {
    if (connection) connection.release();
  }
});

// Get invoice by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM invoice WHERE invoice_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ message: "Error fetching invoice" });
  }
});

// Add this new route to create an invoice
router.post("/", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();

    console.log("Received invoice data:", req.body);

    // Validate required fields
    if (
      !req.body.paymentId ||
      !req.body.customerName ||
      !req.body.totalAmount
    ) {
      throw new Error("Missing required fields");
    }

    // Generate invoice ID
    const today = new Date();
    const yy = today.getFullYear().toString().slice(-2);
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const datePrefix = `INV${yy}${mm}${dd}`;

    // Get the latest sequence
    const [lastInvoice] = await connection.query(
      "SELECT invoice_id FROM invoice WHERE invoice_id LIKE ? ORDER BY invoice_id DESC LIMIT 1",
      [`${datePrefix}%`]
    );

    console.log("Last invoice:", lastInvoice);

    const sequence = lastInvoice.length
      ? String(Number(lastInvoice[0].invoice_id.slice(-3)) + 1).padStart(3, "0")
      : "001";

    const invoiceId = `${datePrefix}${sequence}`;
    console.log("Generated invoice ID:", invoiceId);

    // Insert new invoice
    const result = await connection.query(
      `INSERT INTO invoice (
        invoice_id, 
        payment_id, 
        customer_name, 
        total_amount, 
        amount_paid, 
        change_given, 
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        invoiceId,
        req.body.paymentId,
        req.body.customerName,
        req.body.totalAmount,
        req.body.amountPaid,
        req.body.changeGiven,
        req.body.status || "completed",
      ]
    );

    console.log("Insert result:", result);

    res.status(201).json({
      message: "Invoice created successfully",
      invoiceId: invoiceId,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({
      message: "Error creating invoice",
      error: error.message,
    });
  } finally {
    if (connection) connection.release();
  }
});

// Update archive single invoice route
router.patch("/:id/archived", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE invoice SET archived = 1 WHERE invoice_id = ?",
      [req.params.id]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Invoice archived successfully" });
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    console.error("Error archiving invoice:", error);
    res.status(500).json({ message: "Error archiving invoice" });
  } finally {
    if (connection) connection.release();
  }
});

// Update bulk archive route
router.patch("/bulk-archive", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE invoice SET archived = 1 WHERE archived = 0 OR archived IS NULL"
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Invoices archived successfully" });
    } else {
      res.json({ message: "No invoices to archive" });
    }
  } catch (error) {
    console.error("Error archiving invoices:", error);
    res.status(500).json({ message: "Error archiving invoices" });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
