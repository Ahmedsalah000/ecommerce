// Real email function using Nodemailer with Gmail
const nodemailer = require('nodemailer');

console.log('Nodemailer module loaded:', typeof nodemailer); // Diagnostic log

const sendEmail = async (options) => {
  console.log('sendEmail called with options:', options); // Diagnostic log

  try {
    console.log('createTransport exists:', typeof nodemailer.createTransport); // Check if function exists

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log('Transporter created successfully'); // Diagnostic log

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      text: options.text
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email error:', error.message);
    throw error;
  }
};

module.exports = sendEmail;
