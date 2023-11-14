const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    client_id: {
        type: Number,
        required: true
    },
    client_name: {
        type: String,
        required: true
    },
    project_name: {
        type: String,
        required: true
    },
    handler_name: {
        type: String,
        required: true
    },
    handler_email: {
        type: String,
        required: true
    },
    workshift: {
        type: String,
        required: true
    },
    coretime: {
        type: String,
        required: true
    }
});

const clientSchema = new Schema({
    client_id: {
        type: Number,
        required: true
    },
    client_name: {
        type: String,
        required: true
    },
    handler_name: {
        type: String,
        required: true
    },
    handler_work_number: {
        type: String,
        required: true
    },
    projects: [projectSchema]
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);