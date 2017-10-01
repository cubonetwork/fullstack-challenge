/**
 * The API server configuration
 */

const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./api/models/employeesModel');
const bodyParser = require('body-parser');
const config = require('config');

const app = express();
const port = process.env.PORT || 3000;

// Configure Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.connectionString, {
    useMongoClient: true
});

// Allow cross origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Configure API to return content as JSON format
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Configure routes
var routes = require('./api/routes/employeesRoutes');
routes(app);

if (!module.parent) {
    app.listen(port);
}

console.log('Server started in ' + port + ' port.');

module.exports = app;
