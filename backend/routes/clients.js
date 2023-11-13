const express = require('express');
const {
    addClient,
    getClients,
    getOneClient,
    updateClient
} = require('../controllers/clientsController');

const router = express.Router();

// Add client kasama na yung project potek iisipin pa pano hindi sabay
router.post('/', addClient);

// Get all clients
router.get('/', getClients);

// Get one client

// Update a client

module.exports = router;