/**
 * Employees Edpoint
 */
import employeesController from '../controllers/employeesController';

export default (app) => {
    app.route('/employees')
        .get(employeesController.gelAllEmployees)
        .post(employeesController.createEmployee)
}
