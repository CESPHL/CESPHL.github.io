const Talent = require('../models/talentsModel');
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

// Find employee then check if there is an existing time in date.
// If there is an existing date, don't save it and return a message.
// If there is no existing date, save it to the database.
const timeIn = async (req, res) => {
    const { employee_id } = req.params
    try {
        const talent = await Talent.findOne({ employee_id: employee_id });
        if (!talent) {
            return res.status(404).json({ message: "No such user." });
        }
        else {
            const existingDates = talent.attendance.map((attendance) => attendance.date);
            const hasMatch = existingDates.some(attendanceDate => {
                return attendanceDate === req.body.date;
            });
            if (hasMatch === true) {
                res.status(400).json({ message: "You are only allowed one time in per day." });
            }
            else {
                const talent = await Talent.findOneAndUpdate({ employee_id: employee_id },
                    { $push: { attendance: req.body } },
                );
                res.status(200).json(talent);
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Find employee then check if there is an existing time in date
// If there is, update the time out column of the found date and save it.
// It there is no found date, save it in another row.
const timeOut = async (req, res) => {
    const { employee_id } = req.params;
    try {
        const talent = await Talent.findOne({ employee_id: employee_id });

        if (!talent) {
            return res.status(404).json({ message: "No such user." });
        } else {
            const { time_out, date, client_name, project_name, day } = req.body;

            if (!time_out) {
                return res.status(400).json({ message: "time_out is required." });
            }

            // Find the attendance entry with the specified date
            const attendanceEntry = talent.attendance.find(entry => entry.date === date);
            // Check if the attendance entry with the specified date was found

            if (attendanceEntry) {
                console.log("Found same date attendance, updating values");
                // Update the time_out field
                attendanceEntry.time_out = time_out;
                attendanceEntry.date = date;
                attendanceEntry.day = day;
                attendanceEntry.client_name = client_name;
                attendanceEntry.project_name = project_name;
                // Save the updated talent data
                await talent.save();
                res.status(200).json(talent);
            } else {
                console.log("Did not find any same date attendance, inserting into new row.");
                // Add new array for time out if the day has already passed since we pass the current date from the front end
                const talent = await Talent.findOneAndUpdate({ employee_id: employee_id },
                    { $push: { attendance: req.body } },
                );
                res.status(200).json(talent);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Find employee then check if there is a matching date (Current date from front end == Date from db with time out data.)
// If there is a matching date, check the entry if they have finished their regular shift by checking the time out value. If there is a time out value, save the OT time in.
const timeInOT = async (req, res) => {
    const { employee_id } = req.params;
    try {
        const talent = await Talent.findOne({ employee_id: employee_id });

        if (!talent) {
            return res.status(404).json({ message: "No such user." });
        }
        else {
            const { date, ot_time_in } = req.body;

            // Find the attendance entry with the current date that is submitted from the front end
            // entry.date = from database
            // date = current date (user submitted)
            const attendanceEntry = talent.attendance.find(entry => entry.date === date);
            // If the attendance entry with the current date was found
            if (attendanceEntry) {
                if (attendanceEntry.time_out) {
                    attendanceEntry.ot_time_in = ot_time_in;
                    await talent.save();
                    res.status(200).json({ message: "Saving OT time in data successful." });
                }
                else {
                    res.status(400).json({ message: "You need to have completed your regular shift before going overtime." });
                }
            }
            else {
                res.status(400).json({ message: "Did not find any matches for the current date." });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Find employee then check if there is a matching date (Current date from front end == Date from db with OT time In data.)
// If there is, update the OT time out column of the found date and save it.
const timeOutOT = async (req, res) => {
    const { employee_id } = req.params;

    try {
        const talent = await Talent.findOne({ employee_id: employee_id });

        if (!talent) {
            return res.status(404).json({ message: "No such user." });
        }
        else {
            const { date, ot_time_out } = req.body;

            // Find the attendance entry with the current date that is submitted from the front end
            // entry.date = from database
            // date = current date (user submitted)
            const attendanceEntry = talent.attendance.find(entry => entry.date === date);
            console.log(ot_time_out);
            console.log(date);
            if (attendanceEntry) {
                if (attendanceEntry.ot_time_in) {
                    attendanceEntry.ot_time_out = ot_time_out;
                    await talent.save();
                    res.status(200).json({ message: "Saving OT time out data successful." });
                }
                else {
                    res.status(400).json({ message: "No OT time in data found." });
                }
            }
            else {
                res.status(400).json({ message: "Did not find any matches for the current date." });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getTalents,
    getOneTalent,
    addTalent,
    updateTalent,
    timeIn,
    timeOut,
    timeInOT,
    timeOutOT
}