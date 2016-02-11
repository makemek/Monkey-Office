var Schema = require('monnoob').Schema;

var docSchema = new Schema({
	personReceive: {
		type:Schema.Types.ObjectId,
		ref: 'User'
	},

	type: String,
	date: Date,
	name: String,
	author: String,
	status: Number,
	
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