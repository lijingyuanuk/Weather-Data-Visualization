var nano = require('nano')('http://localhost:5984');
var weatherdb = nano.db.use('weather');

module.exports = weatherdb;
