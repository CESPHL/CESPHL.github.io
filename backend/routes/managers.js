const express = require('express');
const {
    getOneManager,
    addClient
} = require('../controllers/managersController');

const router = express.Router();

// Get specified manager
router.get('/:employee_id', getOneManager);

// Add client to manager account
router.patch('/:employee_id', addClient);

module.exports = router;