const Talent = require('../models/talentsModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Get list of talents
const getTalents = async (req, res) => {
    const talents = await Talent.find({}).sort({ createdAt: -1 });
    res.status(200).json(talents);
}

// Get one talent
const getOneTalent = async (req, res) => {
    const { employee_id } = req.params;

    try {
        const user = await Talent.findOne({ employee_id });
        if (!user) {
            return res.status(404).json({ error: 'Talent not found.' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Add new talent
const addTalent = async (req, res) => {
    const { employee_id, first_name, last_name, email, contact_number, username, password, user_level, clients, attendance } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    try {
        const talent = await Talent.create({ employee_id, first_name, last_name, email, contact_number, username, password: hashedPassword, user_level, clients, attendance });
        res.status(200).json(talent);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Update talent
const updateTalent = async (req, res) => {
    const { employee_id } = req.params;

    try {
        const talent = await Talent.findOneAndUpdate({ employee_id: employee_id }, {
            ...req.body
        });
        if (!talent) {
            return res.status(404).json({ error: 'Talent not found.' });
        }
        res.status(200).json(talent);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const timeIn = async (req, res) => {
    const { employee_id } = req.params
    console.log(employee_id);

    console.log("User entered date: " + req.body.date);

    try {
        const talent = await Talent.findOne({ employee_id: employee_id });
        if (!talent) {
            return res.status(404).json({ message: "No such user." });
        }
        else {
            const existingDates = talent.attendance.map((attendance) => attendance.date);
            const hasMatch = existingDates.forEach(attendanceDate => {
                console.log("User entered date: " + req.body.date);
                console.log("Date from database: " + attendanceDate);
                if (attendanceDate === req.body.date) {
                    return true;
                }
                return false;
            });
            console.log(hasMatch);
            if (hasMatch != true) {
                const talent = await Talent.findOneAndUpdate({ employee_id: employee_id },
                    { $push: { attendance: req.body }}, 
                );
                res.status(200).json(talent);
            }
            else {
                res.status().json()
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

    // try {
    //     const talent = await Talent.findOne({ employee_id: employee_id });
    //     if (!talent) {
    //         console.log("No user found");
    //     }
    //     else {
    //         const attendanceDates = talent.attendance.map((attendance) => attendance.date);
    //         // Check if there is a matching date then update. If not, append
    //         const attendanceHasMatch = attendanceDates.forEach(attendanceDate => {
    //             console.log(attendanceDate);
    //             console.log(req.body.date);
    //             if (attendanceDate === req.body.date) {
    //                 console.log("Has a match. Update this entry.");
    //                 return true;
    //             }
    //             return false;
    //         });
    //         if (attendanceHasMatch === true) {
    //             console.log("Has match.");
    //             talent = await Talent.findOne({ employee_id: employee_id },
    //                 {}
    //             );
    //         }
    //         console.log("No matches found. Pushing.")
    //         const updatedTalent = await Talent.findOne({ employee_id: employee_id },
    //             { $push: { attendance: req.body } },
    //         );
    //         res.status(200).json(updatedTalent);
    //     }
    // }
    // catch (error) {
    //     console.log(error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }
}

const timeOut = async (req, res) => {
    const { employee_id } = req.params
    console.log(employee_id);

    const talent = await Talent.findOneAndUpdate({ employee_id: employee_id },
        { $push: { attendance: req.body } },
    );
    res.status(200).json(talent);
}

module.exports = {
    getTalents,
    getOneTalent,
    addTalent,
    updateTalent,
    timeIn,
    timeOut
}