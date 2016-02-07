var docModel = require('./schema/externalFiles/document');

module.exports = function() {

	docModel.methods.inProgress = inProgress;
	docModel.methods.created = created;
	docModel.methods.done = done;

	return docModel;
}

var created = function() {
	this.status = 2;
}

var inProgress = function() {
	this.status = 1;
}

var done = function() {
	this.status = 0;
}
