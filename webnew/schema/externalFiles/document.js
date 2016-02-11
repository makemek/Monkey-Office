var Schema = require('monnoob').Schema;

var docSchema = new Schema({
	type: String,
	dateCreate: {
		type: Date,
		default: Date.now
	},
	name: String,
	author: String,
	status: {
		type: String,
		enum: ['create', 'in progress', 'done'],
		default: 'create'
	},
	
	relate2docs: [{
		type: Schema.Types.ObjectId,
		ref: 'document'
	}],

	includeInWorkflow: [{
		type: Schema.Types.ObjectId,
		ref: 'workflow'
	}],

	filepath: String
});


module.exports = docSchema;