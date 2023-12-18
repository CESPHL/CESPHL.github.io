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

// Add client to own account
const addClient = async (req, res) => {
    const { employee_id } = req.params;
    try {
        const manager = await Manager.findOne({ employee_id });
        if (!manager) {
            return res.status(404).json({ message: "Manager not found." });
        }
        else {
            manager.clients.push(req.body);
            const result = await manager.save();
            console.log("Client data inserted successfully.", result);
            return res.status(200).json({ message: "Client data inserted successfully." });
        }
    }
    catch (err) {
        console.log("Error inserting client data.", err);
        return res.status(500).json({ message: "Error inserting client data. "});
    }
}

module.exports = {
    getOneManager,
    addClient
}