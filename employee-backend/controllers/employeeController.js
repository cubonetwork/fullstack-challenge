const employeeModel = require('../db/employee');


exports.postEmployee = (req, resp, next)=>{
    const employee = req.body || {};
    const epModel = new employeeModel();
    epModel.firstName = employee.firstName;
    epModel.lastName = employee.lastName;
    epModel.participation = employee.participation;
    epModel.save().then(savedEmployee =>{
        resp.status(200)
        .json(savedEmployee);
    }).catch(error => {
       next(error);
    });
    
}

exports.getEmployees = (req, resp, next)=>{
    
    employeeModel.find({}).then(employees =>{
        resp.status(200)
        .json(employees);
    }).catch(error => {
        console.log(error);
       next(error);
    });
}


