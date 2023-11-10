const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({Message: 'GET ALL TALENTS'});
});

router.get('/:id', (req, res) => {
    res.json({Message: 'GET SINGLE TALENT'});
});

router.post('/', (req, res) => {
    res.json({Message: 'CREATE NEW TALENT'});
});

router.patch('/', (req, res) => {
    res.json({Message: 'UPDATE TALENT'});
});

module.exports = router;