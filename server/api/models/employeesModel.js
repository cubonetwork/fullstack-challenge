/**
 * The Employees model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var EmployeeSchema = new Schema({
    name: String,
    lastName: String,
    participation: Number,
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
