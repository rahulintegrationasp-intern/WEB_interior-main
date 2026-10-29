const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * Strip carriage-return and line-feed characters to prevent email header injection.
 * @param {unknown} value
 * @returns {string}
 */
function sanitize(value) {
  return String(value ?? "").replace(/[\r\n]/g, " ").trim();
}

router.post('/enq', async (req, res) => {
  const {
    firstname,
    lastname,
    mobileno,
    email,
    address,
    selectedservice,
    message,
  } = req.body;

  // Required-field guard
  if (!firstname || !email || !mobileno || !selectedservice || !message) {
    return res.status(400).json({
      error: "Please fill in all required enquiry fields.",
    });
  }

  // Sanitize every field before embedding into HTML email
  const safe = {
    firstname:       sanitize(firstname),
    lastname:        sanitize(lastname),
    mobileno:        sanitize(mobileno),
    email:           sanitize(email),
    address:         sanitize(address),
    selectedservice: sanitize(selectedservice),
    message:         sanitize(message),
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.RECEIVER_EMAIL || "adityasalkar1806@gmail.com",
    subject: "Service Enquiry — Patterns & Pallettes",
    html: `
      <h2>Service Enquiry From Client</h2>
      <p><strong>First name:</strong> ${safe.firstname}</p>
      <p><strong>Last name:</strong> ${safe.lastname}</p>
      <p><strong>Mobile no:</strong> ${safe.mobileno}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Address:</strong> ${safe.address}</p>
      <p><strong>Selected Service:</strong> ${safe.selectedservice}</p>
      <p><strong>Message:</strong> ${safe.message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Service enquiry sent successfully!" });
  } catch (error) {
    console.error("Error sending Service enquiry:", error);
    res.status(500).json({
      error: "Failed to send Service enquiry. Please try again later.",
    });
  }
});

module.exports = router;
