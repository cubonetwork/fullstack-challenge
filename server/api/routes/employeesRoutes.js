/**
 * Employees Edpoint
 */

module.exports = function(app) {
    var employeesController = require('../controllers/employeesController');

    app.route('/employees')
        .get(employeesController.gelAllEmployees)
        .post(employeesController.createEmployee)
}
