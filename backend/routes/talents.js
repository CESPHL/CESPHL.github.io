const express = require('express');
const {
    addTalent,
    getTalents,
    getOneTalent,
    updateTalent,
    timeIn
} = require('../controllers/talentsController'); // Getting from database


const router = express.Router();

// Get all talents
router.get('/', getTalents);

// Get specified talent
router.get('/:employee_id', getOneTalent);

// Add new talent
router.post('/', addTalent);

// Update talent
router.patch('/:employee_id', updateTalent);

// Time in

router.patch('/:employee_id/attendance', timeIn);

module.exports = router;