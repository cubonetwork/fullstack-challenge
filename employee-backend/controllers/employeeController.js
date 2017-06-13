const employeeModel = require('../db/employee');
const RequrestError = require('../util/requestError');

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
        let errorMessage = new RequrestError();
        if(error.name == 'ValidationError'){
            errorMessage.status = 400;
            errorMessage.name = "Erro de validação";
            errorMessage.message ="Por favor, informe todos os campos da API";
            next(errorMessage);
        }else{
            next(error);
        }
    });
    
}

exports.getEmployees = (req, resp, next)=>{
    
    employeeModel.find({}).then(employees =>{
        resp.status(200)
        .json(employees);
    }).catch(error => {
        next(error);
    });
}


