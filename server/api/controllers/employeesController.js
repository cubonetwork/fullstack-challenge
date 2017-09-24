/**
 * The Employees Controller
 */

const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

/**
 * Return a list with all employees
 */
exports.gelAllEmployees = (req, res) => {
    Employee.find({}, (err, employees) => {
        if (err) {
            res.status(500).send(err);
        }

        res.json(employees);
    });
};

/**
 * Create a new employee
 */
exports.createEmployee = (req, res) => {
    let newEmployee = new Employee(req.body);
    let participation = 0;

    try {
        // Validate total participation
        Employee.find({}, (err, employees) => {
            if (err) {
                res.status(400).send(err);
            }

            if (employees.length > 0) {
                employees.forEach((employee) => {
                    participation += parseInt(employee.get('participation'));
                });
            }

            if (newEmployee.participation <= 0) {
                res.status(400).send(validationError('Participation must be 1 or more.', 'participation', 'minLength'));
                return;
            }

            if (participation + newEmployee.participation > 100) {
                res.status(400).send(validationError('Exceeded max of 100 in participation.', 'participation', 'maxlength'));
                return;
            } else {
                newEmployee.save(function(err, employee) {
                    if (err) {
                        res.status(400).send(err);
                    }

                    res.json(employee);
                });
            }
        }).select('participation');
    } catch (ex) {
        res.status(500).send({
            _message: ex.message,
            message: ex.message,
            name: 'ServerError'
        });
    }
};

/**
 * Return an structured json with an error message
 * @param {String} message Error message
 * @param {String} field Name of the field with error
 * @param {String} type Type of validation error
 */
const validationError = (message, field, type) => {
    return {
        errors: {
            field: {
                message: `Path '${field}' is invalid.`,
                name: 'ValidatorError',
                properties: {
                    type: type,
                    message: message,
                    path: field
                },
                kind: 'invalid',
                path: field,
                $isValidatorError: true
            }
        },
        _message: 'Employee validation failed',
        message: `Employee validation failed: ${field}: ${message}.`,
        name: 'ValidationError'
    }
}
