const Talent = require('../models/talentsModel');
const Manager = require('../models/managersModel');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');

// Get list of users (Admins, Managers, Talents)
const getUsers = async (req, res) => {
    const talents = await Talent.find({}).sort({ createdAt: -1 });
    const managers = await Manager.find({}).sort({ createdAt: -1 });
    const admins = await Admin.find({}).sort({ createdAt: -1 });
    const data = [...talents, ...managers, ...admins];
    res.status(200).json(data);
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
        res.status(500).json({ message: "Internal server error." });
    }
}

// Add user
const addUser = async (req, res) => {
    console.log("Add user");
    // const { employee_id, first_name, last_name, email, contact_number, username, password, user_level } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);

    // try {
    //     if (user_level == "Talent") {
    //         const talent = await Talent.create({ employee_id, first_name, last_name, email, contact_number, username, password: hashedPassword, user_level, clients, attendance });
    //         res.status(200).json(talent);
    //     }
    //     if (user_level == "Manager") {
    //         const manager = await Manager.create({ employee_id, first_name, last_name, email, contact_number, username, password: hashedPassword, user_level, clients });
    //         res.status(200).json(manager);
    //     }
    //     if (user_level == "Admin") {
    //         const admin = await Admin.create({ employee_id, first_name, last_name, email, contact_number, username, password: hashedPassword, user_level });
    //         res.status(200).json(admin);
    //     }
    // }
    // catch (error) {
    //     console.error("Error:", error);
    //     return res.status(500).json({ message: "Internal server error.", error: error.message });
    // }
}

module.exports = {
    getUsers,
    getOneUser,
    addUser
}