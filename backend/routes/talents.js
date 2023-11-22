const express = require('express');
const {
    addTalent,
    getTalents,
    getOneTalent,
    updateTalent,
    timeIn,
    timeOut,
    timeInOT,
    timeOutOT,
    changePassword
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
router.patch('/:employee_id/timein', timeIn);

// Time out
router.patch('/:employee_id/timeout', timeOut);

// Time in OT
router.patch('/:employee_id/timeinOT', timeInOT);

// Time out OT
router.patch('/:employee_id/timeoutOT', timeOutOT);

// Change password
router.post('/changepass/:employee_id', changePassword);

module.exports = router;