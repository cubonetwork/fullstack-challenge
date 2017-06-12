const db = require('./_db');
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {type: String,required: [true, "Voce precisa informar um nome!"]},
    lastName: {type: String,required: [true, "Voce precisa informar um sobrenome!"]},
    participation: {type: mongoose.SchemaTypes.Number,required: [true, "Voce precisa informar a participacao!"]}
}, {versionKey: false});

module.exports = db.model('employees', employeeSchema);