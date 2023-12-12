const express = require('express');
const {
    getUsers,
    getOneUser,
    addUser,
    editUser,
    deleteUser
} = require('../controllers/adminController'); 

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get specified user
router.get('/:employee_id', getOneUser);

// Add user
router.post('/', addUser);

// Edit user
router.patch('/:employee_id', editUser);

// Delete user
router.delete('/:employee_id', deleteUser);

module.exports = router;