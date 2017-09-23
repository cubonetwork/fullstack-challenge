/**
 * The Employees Controller
 */

import mongoose from 'mongoose'

let Employee = mongoose.model('Employees');

/**
 * Return a list with all employees
 */
exports.gelAllEmployees = (req, res) => {
    Employee.find({}, (err, employee) => {
        if (err) {
            res.send(err);
        }

        res.json(employee);
    })
}

/**
 * Create a new employee
 */
exports.createEmployee = (req, res) => {
    let newEmployee = new Employee(req.body);

    newEmployee.save((err, employee) => {
        if (err) {
            res.send(err);
        }

        res.json(employee);
    })
}
