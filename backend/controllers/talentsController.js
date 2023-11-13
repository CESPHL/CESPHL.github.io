const Talent = require('../models/talentsModel');
const mongoose = require('mongoose');

// Get list of talents
const getTalents = async(req, res) => {
    const talents = await Talent.find({}).sort({createdAt: -1});
    res.status(200).json(talents);
}

// Get one talent
const getOneTalent = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Talent not found."})
    };

    const talent = await Talent.findById(id);
    if (!talent) {
        return res.status(404).json({error: 'Talent not found.'});
    }
    res.status(200).json(talent);
}

// Add new talent
const addTalent = async(req, res) => {
    const {employee_id, first_name, last_name, email, manager} = req.body;

    try {
        const talent = await Talent.create({employee_id, first_name, last_name, email, manager});
        res.status(200).json(talent);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Update talent
const updateTalent = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Talent not found."})
    };

    const talent = await Talent.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if (!talent) {
        return res.status(404).json({error: 'Talent not found.'});
    }
    res.status(200).json(talent);
}

module.exports = {
    addTalent,
    getTalents,
    getOneTalent,
    updateTalent
}