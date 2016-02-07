var dms = require('lib/dmsDb');

var Schema = dms.util.Schema;
var schemaName = 'Document';

var docSchema = {
	type: String,
	date: Date,
	name: String,
	author: String,
	status: Number,
	
	relate2docs: [{
		type: Schema.Types.ObjectId,
		ref: schemaName
	}],

	includeInWorkflow: [{
		type: Schema.Types.ObjectId,
		ref: 'workflow'
	}],

	filepath: String
};


module.exports = dms.model(schemaName, docSchema);