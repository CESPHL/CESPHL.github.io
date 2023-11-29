const express = require('express');
const {
    getOneManager,
    updateManager
} = require('../controllers/managersController');

const router = express.Router();

// Get specified manager
router.get('/:employee_id', getOneManager);

// Update manager profile
router.patch('/:employee_id', updateManager);

module.exports = router;