module.exports = (sequelize, DataType) => {
    const Employee = sequelize.define('Employee', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        sobrenome: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        participacao: {
            type: DataType.FLOAT,
            allowNull: false
        }
    });

    Employee.associate = models => {
        // There is not entity associated with Employee
    };

    return Employee;
};