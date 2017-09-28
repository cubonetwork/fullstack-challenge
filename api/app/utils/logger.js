const winston = require('winston');

const DEFAULT_LOGGING_LEVEL = 'warn';
const AVAILABLE_LEVELS = ['debug', 'info', 'warn', 'error'];

/**
 * order of precedence is: process.env.LOG_LEVEL > global.appConfig.logging.level > DEFAULT_LOGGING_LEVEL
 */
global.appConfig = global.appConfig || {};
global.appConfig.logging = global.appConfig.logging || {};
global.appConfig.logging.level = process.env.LOG_LEVEL || global.appConfig.logging.level || DEFAULT_LOGGING_LEVEL;

let level = global.appConfig.logging.level = global.appConfig.logging.level.toLowerCase();

if (!AVAILABLE_LEVELS.includes(level)) {
    winston.log('warn', '\'%s\' is not a valid logging level. Valid levels are: %s. Logging level will default to \'%s\'', level, AVAILABLE_LEVELS.join(', '), DEFAULT_LOGGING_LEVEL);
    level = DEFAULT_LOGGING_LEVEL;
}

let logger = new winston.Logger({
    level: level,
    transports: [
        new (winston.transports.Console)({
            colorize: true
        })
    ]
});

module.exports = logger;