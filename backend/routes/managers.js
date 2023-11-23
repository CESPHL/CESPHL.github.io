const express = require('express');
const {
    getManagers,
    getOneManager,
    addManager,
    updateManager
} = require('../controllers/managersController');

const router = express.Router();

// Get all managers
router.get('/', getManagers);

// Get specified manager
router.get('/:employee_id', getOneManager);

router.post('/', addManager);

router.patch('/:employee_id', updateManager);

module.exports = router;