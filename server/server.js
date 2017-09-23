/**
 * The API server configuration
 */
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.listen(port);

console.log('API started in ' + port + ' port.');
