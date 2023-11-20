const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    time_in: { type: String, required: false },
    time_out: { type: String, required: false },
    date: { type: String, required: false },
    day: { type: String, required: false },
    client_name: { type: String, required: false},
    project_name: { type: String, required: false },
    ot_time_in: { type: String, required: false },
    ot_time_out: { type: String, required: false },
    total_hours: { type: String, required: false}
});

const talentSchema = new Schema({
    employee_id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    contact_number: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    user_level: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
    clients: [{
        "client_id": { type: String, required: true},
        "client_name": { type: String, required: true },
        "sdm_sdl_name": { type: String, required: true },
        "projects": [{
            "project_name": { type: String, required: true }
        }]
    }],
    attendance: [attendanceSchema]
}, { timestamps: true });

module.exports = mongoose.model('Talent', talentSchema);