var schema = require('../schema/externalFiles/document');

module.exports = function(dbConnection) {

	schema.statics.findByUser = function(user) {
		return this.find({'personReceive': user});
	};

	schema.statics.findByAuthor = function(author, resultCallbackFunction) {
		return this.find({'author': author}, resultCallbackFunction);
	};

	schema.methods.created = function() {
		this.status = 2;
	};
	schema.methods.inProgress = function() {
		this.status = 1;
	};
	schema.methods.done = function() {
		this.status = 0;
	}
	schema.methods.getStatus = function() {
		return this.status;
	};

	schema.methods.personResponsible = function() {
		return this.personReceive;
	}

	var schemaName = 'document';
	return dbConnection.model(schemaName, schema);
}

