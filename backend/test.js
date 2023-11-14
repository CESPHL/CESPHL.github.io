const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
 
const app = express();
app.use(express.json());
 
// This is a simple in-memory database to store user emails and reset tokens.
const users = [
    { email: 'user@example.com', resetToken: '' } // Add your user data here
];
 
// Configure Nodemailer to use a test account or your SMTP settings
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the appropriate email service
    auth: {
        user: 'your_email@gmail.com', // Your email
        pass: 'your_password' // Your password
    }
});
 
// ... (Previous code)
 
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
 
    const user = users.find(user => user.email === email);
 
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
 
    // Generate a reset token and set an expiration time (30 minutes)
    const token = crypto.randomBytes(20).toString('hex');
    const expirationTime = Date.now() + 30 * 60 * 1000; // 30 minutes in milliseconds
    user.resetToken = { token, expires: expirationTime };
 
    // Send the email with password reset instructions
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Password Reset Instructions',
        text: `To reset your password, click on the following link: http://yourwebsite.com/reset/${token}`
    };
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send email' });
        }
        return res.json({ message: 'Password reset instructions sent to your email' });
    });
});
 
// New endpoint to handle password reset with the token
app.post('/reset-password', (req, res) => {
    const { email, token, newPassword } = req.body;
 
    const user = users.find(user => user.email === email);
 
    if (!user || user.resetToken.token !== token) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
 
    if (Date.now() > user.resetToken.expires) {
        return res.status(400).json({ message: 'Token expired' });
    }
 
    // Reset the password (for demonstration, updating the token and password in the user object)
    user.password = newPassword;
    user.resetToken = '';
 
    return res.json({ message: 'Password reset successfully' });
});