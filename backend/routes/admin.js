const express = require('express');
const {
    getUsers,
    getOneUser,
    addUser,
    editUser,
    deleteUser,
    getAllClients,
    getAllManagers
} = require('../controllers/adminController'); 

const router = express.Router();

// Get clients
router.get('/clients/', getAllClients); // Must be defined first before get specified user. Don't understand why.

router.get('/managers/get', getAllManagers);

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