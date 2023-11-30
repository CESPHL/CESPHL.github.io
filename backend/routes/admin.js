const express = require('express');
const {
    getUsers,
    getOneUser,
    addManager,
    addTalent,
    addAdmin
} = require('../controllers/adminController'); 

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get specified user
router.get('/:employee_id', getOneUser);

// Add manager
router.post('/', addManager);

// Add talent
router.post('/', addTalent);

// Add admin
router.post('/', addAdmin);

module.exports = router;