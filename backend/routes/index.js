const express = require('express');

const router = express.Router();

// Simulated user data (for demonstration purposes)
const users = [
    { username: 'rovinjan', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];

// Endpoint for user login 
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the provided username and password match any user in your database
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
});

// Endpoint for forgot password
router.post('/forgot-password', (req, res) => {
    const { username, email } = req.body;
  
    // Check if the provided username and email match any user in your database
    const user = users.find(u => u.username === username);
  
    if (user) {
      // Here you can implement logic to send a password reset link to the user's email
      res.status(200).json({ message: 'Password reset instructions sent to your email' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;