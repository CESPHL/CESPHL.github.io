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
        return res.status(500).json({ message: "Error inserting client data. " });
    }
}

// Edit client info
const editClient = async (req, res) => {
    console.log("Edit client");

    const { employee_id, client_id } = req.params;
    const updatedClientData = req.body;

    try {
        const manager = await Manager.findOne({ employee_id });

        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }

        const clientToUpdate = manager.clients.find((client) => client.client_id === client_id);

        if (!clientToUpdate) {
            return res.status(404).json({ error: 'Client not found' });
        }

        // Update the client data
        Object.assign(clientToUpdate, updatedClientData);

        await manager.save();

        return res.status(200).json({ message: 'Client updated successfully' });
    }
    catch (error) {
        console.error('Error updating client:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

const addProject = async (req, res) => {
    const { employee_id, client_id } = req.params;
    const { project_id, project_name, workshift, coretime, status } = req.body;

    try {
        // Find the manager using the employee_id
        const manager = await Manager.findOne({ employee_id });

        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }

        // Find the specified client by client_id
        const client = manager.clients.find(client => client.client_id === client_id);

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        // Add the new project to the client's projects array
        client.projects.push({ project_id, project_name, workshift, coretime, status });

        // Save the changes to the database
        await manager.save();

        return res.status(200).json({ message: 'Project added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getOneManager,
    addClient,
    editClient,
    addProject
}