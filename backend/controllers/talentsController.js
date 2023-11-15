const Talent = require('../models/talentsModel');
const mongoose = require('mongoose');

// Get list of talents
const getTalents = async(req, res) => {
    const talents = await Talent.find({}).sort({createdAt: -1});
    res.status(200).json(talents);
}

// Get one talent
const getOneTalent = async(req, res) => {
    const { employee_id } = req.params;

    try {
        const user = await Talent.findOne({ employee_id });
        if (!user) {
            return res.status(404).json({error: 'Talent not found.'});
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
}

// Add new talent
const addTalent = async(req, res) => {
    const {employee_id, first_name, last_name, email, contact_number, username, password, user_level, clients, attendance} = req.body;
    try {
        const talent = await Talent.create({employee_id, first_name, last_name, email, contact_number, username, password, user_level, clients, attendance});
        res.status(200).json(talent);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Update talent
const updateTalent = async(req, res) => {
    const {employee_id} = req.params;

    try {
        const talent = await Talent.findOneAndUpdate({employee_id: employee_id}, {
            ...req.body
        });
        if (!talent) {
            return res.status(404).json({error: 'Talent not found.'});
        }
        res.status(200).json(talent);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
}

const timeIn = async(req, res) => {
    const { employee_id } = req.params
    // console.log(employee_id);

    console.log(req.body.date);

    try {
        const talent = await Talent.findOneAndUpdate({ employee_id: employee_id },
            { "$push": { attendance: req.body }}, 
        );
        res.status(200).json(talent);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error'});
    }
}

module.exports = {
    getTalents,
    getOneTalent,
    addTalent,
    updateTalent,
    timeIn
}