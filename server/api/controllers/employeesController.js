/**
 * The Employees Controller
 */

var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

/**
 * Return a list with all employees
 */
exports.gelAllEmployees = function(req, res) {
    Employee.find({}, function(err, employee) {
        if (err) {
            res.send(err);
        }

        res.json(employee);
    });
};

/**
 * Create a new employee
 */
exports.createEmployee = function(req, res) {
    let newEmployee = new Employee(req.body);

    newEmployee.save(function(err, employee) {
        if (err) {
            res.send(err);
        }

        res.json(employee);
    });
};
