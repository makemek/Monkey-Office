var schema = require('../schema/externalFiles/document');
var dmsDb = require('../lib/dmsDb');

module.exports = function() {
	schema.statics.created = function() {
		this.status = 2;
	};
	schema.statics.inProgress = function() {
		this.status = 1;
	};
	schema.statics.done = function() {
		this.status = 0;
	}
	schema.statics.getStatus = function() {
		return this.status;
	};

	var schemaName = 'document';
	return dmsDb.model(schemaName, schema);
}

