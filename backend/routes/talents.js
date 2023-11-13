const express = require('express');
const {
    addTalent,
    getTalents,
    getOneTalent,
    updateTalent
} = require('../controllers/talentsController');


const router = express.Router();

// Get all talents
router.get('/', getTalents);

// Get specified talent
router.get('/:id', getOneTalent);

// Add new talent
router.post('/', addTalent);

// Update talent
router.patch('/:id', updateTalent);

module.exports = router;