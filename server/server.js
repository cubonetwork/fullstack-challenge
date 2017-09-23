/**
 * The API server configuration
 */
var express = require('express');
var mongoose = require('mongoose');
var Employee = require('./api/models/employeesModel');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

// Configure Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/EmployeesDb', {
    useMongoClient: true
});

// Configure API to return content as JSON format
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Configure routes
var routes = require('./api/routes/employeesRoutes');
routes(app);

app.listen(port);

console.log('Server started in ' + port + ' port.');
