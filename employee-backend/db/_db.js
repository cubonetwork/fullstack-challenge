const mongoose = require('mongoose');
const bluebird = require('bluebird');
const environment = require('../environment')();

let options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  promiseLibrary: bluebird,
}

mongoose.connect(environment.db_url, options);
mongoose.Promise = bluebird;

let _db = mongoose.connection;

_db.on('error', console.error.bind(console, 'connection error:'));

_db.once('open', () => {
    console.log('The database employee application is running');
});

module.exports = _db;