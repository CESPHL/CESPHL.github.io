const express = require('express');
const {
    getUsers,
    getOneUser,
    addManager,
    addTalent
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

module.exports = router;