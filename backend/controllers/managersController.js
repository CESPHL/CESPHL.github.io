const Manager = require('../models/managersModel');

// Get one manager
const getOneManager = async (req, res) => {
    const { employee_id } = req.params;

    try {
        const user = await Manager.findOne({ employee_id });
        if (!user) {
            return res.status(404).json({ error: 'Manager not found.' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update own profile
const updateManager = async (req, res) => {
    const { employee_id } = req.params;

    try {
        const manager = await Manager.findOneAndUpdate({ employee_id: employee_id }, {
            ...req.body
        });
        if (!manager) {
            return res.status(404).json({ error: "Manager not found."});
        }
        res.status(200).json(manager);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getOneManager,
    updateManager
}