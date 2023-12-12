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
    console.log("Getting user info");
    const { employee_id } = req.params;
    try {
        const talent = await Talent.findOne({ employee_id });
        const manager = await Manager.findOne({ employee_id });
        const admin = await Admin.findOne({ employee_id });

        if (talent) {
            return res.status(200).json(talent);
        }
        if (manager) {
            return res.status(200).json(manager);
        }
        if (admin) {
            return res.status(200).json(admin);
        }
        res.status(404).json({ message: "No such user." });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
}

// Add user
const addUser = async (req, res) => {
    const { employee_id, first_name, last_name, email, contact_number, username, password, user_level } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        if (user_level == "Talent") {
            const talent = await Talent.create({ employee_id, first_name, last_name, email, contact_number, username, password: hashedPassword, user_level });
            res.status(200).json(talent);
        }
        if (user_level == "Manager") {
            const manager = await Manager.create({ employee_id, first_name, last_name, email, contact_number, username, password: hashedPassword, user_level });
            res.status(200).json(manager);
        }
        if (user_level == "Admin") {
            const admin = await Admin.create({ employee_id, first_name, last_name, email, contact_number, username, password: hashedPassword, user_level });
            res.status(200).json(admin);
        }
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

// Edit user
const editUser = async (req, res) => {
    const findEmployee = JSON.stringify(req.params);
    // Use a regular expression to match the employee_id value
    const match = findEmployee.match(/"employee_id":"(\d+)"/);

    // Extract the employee_id value from the match
    const employeeToFind = match ? match[1] : null;

    const { employee_id, first_name, last_name, email, contact_number, manager_name, user_level } = req.body;

    try {
        if (user_level == "Talent") {
            const talent = await Talent.findOneAndUpdate({ employee_id: employeeToFind }, {
                ...req.body
            });
            if (!talent) {
                return res.status(404).json({ error: "Talent not found." });
            }
            res.status(200).json(talent);
        }
        if (user_level == "Manager") {
            const manager = await Manager.findOneAndUpdate({ employee_id: employeeToFind }, {
                ...req.body
            });
            if (!manager) {
                return res.status(404).json({ error: "Manager not found." });
            }
            res.status(200).json(manager);
        }
        if (user_level == "Admin") {
            const admin = await Admin.findOneAndUpdate({ employee_id: employeeToFind }, {
                ...req.body
            });
            if (!admin) {
                return res.status(404).json({ error: "Admin not found." });
            }
            res.status(200).json(admin);
        }
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

// Delete user
const deleteUser = async (req, res) => {
    console.log(JSON.stringify(req.body));
    console.log(req.body.employee_id);
    console.log(req.body.user_level);

    try {
        if (req.body.user_level === "Talent") {
            const talent = await Talent.findOneAndDelete(req.body.employee_id);
            if (!talent) {
                return res.status(404).json({ error: "Talent not found." });
            }
            res.status(200).json({ message: "User deleted successfully." });
        }
        if (req.body.user_level === "Manager") {
            const manager = await Manager.findOneAndDelete(req.body.employee_id);
            if (!manager) {
                return res.status(404).json({ error: "Manager not found." });
            }
            res.status(200).json({ message: "User deleted successfully." });
        }
        if (req.body.user_level === "Admin") {
            const admin = await Admin.findOneAndDelete(req.body.employee_id);
            if (!admin) {
                return res.status(404).json({ error: "Admin not found." });
            }
            res.status(200).json({ message: "User deleted successfully." });
        }
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

module.exports = {
    getUsers,
    getOneUser,
    addUser,
    editUser,
    deleteUser
}