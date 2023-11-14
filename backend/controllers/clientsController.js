const Client = require('../models/clientsModel');
const mongoose = require('mongoose');

const getClients = async(req, res) => {
    const clients = await Client.find({}).sort({createdAt: -1});
    res.status(200).json({clients});
}

const getOneClient = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Talent not found."});
    }

    const client = await Client.findById(id);
    if(!talent) {
        return res.status(404).json({error: 'Talent not found.'});
    }
    res.status(200).json(client);
}

const addClient = async(req, res) => {
    const {client_id, client_name, handler_name, handler_work_number, projects} = req.body;

    try {
        const client = await Client.create({client_id, client_name, handler_name, handler_work_number, projects});
        res.status(200).json(client);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getClients,
    getOneClient,
    addClient
}