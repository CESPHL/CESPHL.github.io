const Talent = require('../models/talentsModel');
const Manager = require('../models/managersModel');
const bcrypt = require('bcrypt');

// Get list of users (Admins, Managers, Talents)
const getUsers = async (req, res) => {
    const talents = await Talent.find({}).sort({ createdAt: -1 });
    const managers = await Managers.find({}).sort({ createdAt: -1});
    res.status(200).json(talents, managers);
}