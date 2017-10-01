/**
 * The Employees Model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema

let EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    participation: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Employee', EmployeeSchema);
