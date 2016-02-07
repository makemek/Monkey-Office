/*
Singleton connection to DMS
Taking advantage of module caching
*/

var dmsDBConfig = require('../config/dbconfig');
var Connection = require('monnoob').connection;

var connect2database = function() {
	var dmsDB = new Connection(
		dmsDBConfig.host,
		dmsDBConfig.database,
		dmsDBConfig.port,

		dmsDBConfig.username,
		dmsDBConfig.password
	);

	return dmsDB.open();
}

module.exports = connect2database();