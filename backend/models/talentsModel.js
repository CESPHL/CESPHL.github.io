const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    manager: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Talent', talentSchema);