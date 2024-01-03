const express = require('express');
const {
    getOneManager,
    addClient,
    editClient,
    addProject,
    changePasswordManager,
    editProject
} = require('../controllers/managersController');

const router = express.Router();

// Get specified manager
router.get('/:employee_id', getOneManager);

// Add client to manager account
router.patch('/:employee_id', addClient);

// Edit client info
router.patch('/:employee_id/clients/:client_id', editClient);

// Add project
router.post('/:employee_id/clients/:client_id', addProject);

// Change password
router.post('/changepass/:employee_id', changePasswordManager);

// Edit project info
router.patch('/:employee_id/clients/:account_id/edit-project/:project_id', editProject);

module.exports = router;