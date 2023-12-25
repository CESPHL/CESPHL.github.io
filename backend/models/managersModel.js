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
        "client_address": { type: String, required: true },
        "client_sdm_name": { type: String, required: true },
        "client_sdm_email": { type: String, required: true },
        "client_sdm_contact": { type: String, required: true},
        "client_poc_name": { type: String, required: true },
        "client_poc_email": { type: String, required: true},
        "projects": [{
            "project_id": { type: String, required: true },
            "project_name": { type: String, required: true },
            "workshift": { type: String, required: true },
            "coretime": { type: String, required: true },
            "status": { type: String, required: true}
        }]
    }],
    manager_name: {type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Manager', managerSchema);