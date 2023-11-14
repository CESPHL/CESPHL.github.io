const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    timeIn: {
        type: String,
        required: true
    },
    timeOut: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    Day: {
        type: String,
        required: true
    },
    ProjectName: {
        type: String,
        required: true
    },
    OTtimeIn: {
        type: String,
        required: false
    },
    OTtimeout: {
        type: String,
        required: false
    }
});

const talentSchema = new Schema({
    employee_id: {
        type: Number,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_level: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpiry: {
        type: Date
    },
    client: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }],
    attendance: [attendanceSchema]
}, { timestamps: true });

module.exports = mongoose.model('Talent', talentSchema);