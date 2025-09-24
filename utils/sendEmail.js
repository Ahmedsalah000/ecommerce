// Real email function using Nodemailer with Gmail
const nodemailer = require('nodemailer');


const sendEmail = async (options) => {

  try {

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });


    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      text: options.text
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error.message);
    throw error;
  }
};

module.exports = sendEmail;
