const Manager = require('../models/managersModel');
const bcrypt = require('bcrypt');

// Get list of talents
const getManagers = async (req, res) => {
    const managers = await Manager.find({}).sort({ createdAt: -1});
    res.status(200).json(managers);
}

// Get one talent
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

const addManager = async (req, res) => {
    const { employee_id, first_name, last_name, email, contact_number, username, password, user_level, clients } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const manager = await Manager.create({ employee_id, first_name, last_name, email, contact_number, username, password, user_level, clients });
        res.status(200).json(manager);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

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
    getManagers,
    getOneManager,
    addManager,
    updateManager
}