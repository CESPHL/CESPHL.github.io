const express = require('express');
const authenticateToken = require('../Middleware/JWTAuthenticator.js');
const {
  findUser,
  forgotPassword,
  resetPass
} = require('../controllers/indexController'); // Getting from database
const router = express.Router();

router.post('/login', findUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPass);
router.post('/validate-token', authenticateToken, (req,res) => {
  res.json({ isValid: true });
});

module.exports = router;