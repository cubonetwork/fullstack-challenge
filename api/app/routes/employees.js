
module.exports = app => {

    app.get('/employees', (req, res) => {
    
        app.infra.database.models.Employee.findAll({
            order: app.infra.database.sequelize.col('participacao')
        }).then(employees => {
            return res.status(200).send(employees);
        }); 

    });

    app.post('/employees', (req, res) => {

        req.assert('nome', 'Nome é obrigatório e deve possuir no máximo 20 caracteres.')
            .notEmpty()
            .isLength({ max: 20});
        req.assert('sobrenome', 'Sobrenome é obrigatório e deve possuir no máximo 20 caracteres.')
            .notEmpty()
            .isLength({ max: 20});
        req.assert('participacao', 'Participação dever ser um número (%) entre 0 e 100.')
            .isFloat({ min: 0, max: 100 });

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json(errors);
        }

        let result = {};
        let employee = req.body;
        let employeeModel = app.infra.database.models.Employee;

        // Cheking the `participacao` sum of registered employees
        employeeModel
            .sum('participacao')
            .then(sum => {

                // Checking if the sum of `participacao` is bigger than 100.
                if(sum + employee.participacao > 100) {
                    return res.status(205).send({
                        message: `O total de participação já atingiu o valor de ${sum}% e não é possível adicionar um funcionário com ${employee.participacao}% de participação.`    
                    });                    
                } 

                // Trying to save employee
                employeeModel
                    .build(employee)
                    .save()
                    .then(newEmployee => {
                        return res.status(201).send({
                            message: 'Funcionário criado com sucesso.',
                            data: newEmployee
                        });
                    })
                    .catch(error => {
                        return res.status(500).send({
                            message: 'Falha ao adicionar funcionário.',
                            data: error
                        });
                    });  

            });

    });

};