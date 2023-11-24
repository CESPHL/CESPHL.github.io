const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema({
    employee_id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    contact_number: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: false },
    user_level: { type: String, required: true },
    clients: [{
        "client_id": { type: String, required: true },
        "client_name": { type: String, required: true },
        "projects": [{
            "project_name": { type: String, required: true }
        }]
    }],
}, { timestamps: true });

module.exports = mongoose.model('Manager', managerSchema);