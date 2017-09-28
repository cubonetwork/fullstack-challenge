const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let database = null;

module.exports = app => {
    
    if (!database) {
        
        let databaseConfig = global.appConfig.database[process.env.NODE_ENV || 'development'];
        
        let sequelize = new Sequelize(databaseConfig.database, databaseConfig.user, databaseConfig.pwd, databaseConfig);
    
        database = {
            sequelize,
            Sequelize,
            models: {}
        };

        let dir = path.join(__dirname, '../models');
        fs.readdirSync(dir).forEach(file => {
            let modelDir = path.join(dir, file);
            let model = sequelize.import(modelDir);
            database.models[model.name] = model;
        });

        Object.keys(database).forEach(modelName => {
            if ('associate' in database[modelName]) {
                database[modelName].associate(database);
            }
        });
    }

    return database;
};