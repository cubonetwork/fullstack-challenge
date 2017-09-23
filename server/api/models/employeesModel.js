/**
 * The Employees model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var EmployeeSchema = new Schema({
    Id: Number,
    Name: String,
    LastName: String,
    Particpation: Number,
    CreateDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Employee', EmployeeSchema);
