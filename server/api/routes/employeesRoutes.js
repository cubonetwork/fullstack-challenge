/**
 * The Employees Endpoint
 */

module.exports = function(app) {
    let employeesController = require('../controllers/employeesController');

    app.route('/employees')
        .get(employeesController.gelAllEmployees)
        .post(employeesController.createEmployee)
}
