const express = require('express');
const {
  findUser,
  forgotPassword,
  resetPass
} = require('../controllers/indexController'); // Getting from database
const router = express.Router();

router.post('/login', findUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPass);

module.exports = router;