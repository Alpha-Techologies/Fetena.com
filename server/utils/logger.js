// logger.js
const winston = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('../config');

// Create the logs directory if it doesn't exist
const logDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
});

const logger = winston.createLogger({
    level: config.NODE_ENV === 'development' ? 'debug' : 'warn',
    levels,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }), // Include stack trace in error logs
        winston.format.printf(
            (info) => `[${info.timestamp}]: ${info.level}: ${info.message}${info.stack ? `\n${info.stack}` : ''}`
        )
    ),
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: path.join(logDirectory, 'error.log'),
            maxsize: 10000000, // 10MB
            maxFiles: 10
        }),
        new winston.transports.File({
            filename: path.join(logDirectory, 'combined.log'),
            maxsize: 10000000, // 10MB
            maxFiles: 10
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true })
            )
        })
    ]
});

module.exports = logger;