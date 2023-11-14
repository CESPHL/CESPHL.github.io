const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Outlook', 'Yahoo', etc.
  auth: {
    user: 'miniertmailer@gmail.com',
    pass: 'qzfm otmc dkwp gdvv',
  },
});

module.exports = transporter;