const SERVER_PORT = process.env.PORT || 3000;

const YAML = require('yamljs');
global.appConfig = YAML.load('./app/config/app.yml');

let app = require('./app/config/express')();
const logger = require('./app/utils/logger');

app.infra.database.sequelize
    .sync()
    .then(() => {
        
        app.listen(SERVER_PORT, () => {
            logger.info(`Listening on http://localhost:${SERVER_PORT}`);
        });

    }).catch(error => {
        logger.error('Unable to sync database with models:', error);
    });

module.exports = app;