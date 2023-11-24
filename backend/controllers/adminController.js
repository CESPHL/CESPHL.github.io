const Talent = require('../models/talentsModel');
const Manager = require('../models/managersModel');
const bcrypt = require('bcrypt');

// Get list of users (Admins, Managers, Talents)
const getUsers = async (req, res) => {
    const talents = await Talent.find({}).sort({ createdAt: -1 });
    const managers = await Manager.find({}).sort({ createdAt: -1 });
    res.status(200).json(talents, managers);
}

// Get one user 
const getOneUser = async (req, res) => {
    const { employee_id } = req.params;
    try {
        const talent = await Talent.findOne({ employee_id });
        const manager = await Manager.findOne({ employee_id });

        if (!talent) {
            return res.status(404).json({ error: 'Talent not found.' });
        }
        if (!manager) {
            return res.status(404).json({ error: 'Manager not found.' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ messagaea: "Internal server error."});
    }
}


// Add manager
const addManager = async (req, res) => {
    const { employee_id, first_name, last_name, email, contact_number, username, password, user_level, clients } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const talent = await Talent.create({ employee_id, first_name, last_name, email, contact_number, username, password: hashedPassword, user_level, clients, attendance });
        res.status(200).json(talent);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Add talent
const addTalent = async (req, res) => {
    const { employee_id, first_name, last_name, email, contact_number, username, password, user_level, clients, attendance } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const talent = await Talent.create({ employee_id, first_name, last_name, email, contact_number, username, password: hashedPassword, user_level, clients, attendance });
        res.status(200).json(talent);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getUsers,
    getOneUser,
    addManager,
    addTalent
}