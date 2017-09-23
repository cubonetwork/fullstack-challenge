/**
 * The Employees model
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    Id: Number,
    Name: String,
    LastName: String,
    Particpation: Number,
    CreateDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Employees', EmployeeSchema)
