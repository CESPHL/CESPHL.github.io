const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    employee_id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    contact_number: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    user_level: { type: String, required: true },
    manager_name: {type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);