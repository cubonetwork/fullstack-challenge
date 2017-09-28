const express = require('express');
const expressValidator = require('express-validator');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
    let app = express();
    
    app.use(bodyParser.json());
    
    app.use(expressValidator());
    
    consign({cwd: 'app'})
        .include('infra')
        .then('middlewares')
        .then('routes')
        .into(app);
    
    return app;
};