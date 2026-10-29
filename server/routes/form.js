const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post('/enq', async (req, res) => {
  const { firstname, lastname, mobileno, email, address, selectedservice, message } = req.body;

  if (!firstname || !email || !mobileno || !selectedservice || !message) {
    return res.status(400).json({
      error: "Please fill in all required enquiry fields.",
    });
  }

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
      <p><strong>First name:</strong> ${firstname}</p>
      <p><strong>Last name:</strong> ${lastname || ""}</p>
      <p><strong>Mobile no:</strong> ${mobileno}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address || ""}</p>
      <p><strong>Selected Service:</strong> ${selectedservice}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Service enquirey sent successfully!" });
  } catch (error) {
    console.error("Error sending Service enquirey:", error);
    res.status(500).json({
      error: "Failed to send Service enquirey. Please try again later.",
    });
  }
});

module.exports = router;