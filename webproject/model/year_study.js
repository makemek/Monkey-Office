var mongoose = require('mongoose');

//define schema for year study schema
var yearSchema = mongoose.Schema({

	program_name : String,
	program_year : Number,
	academic_year : Number,
	year_level : [{
		year : Number,
		subject : [String]		
	}]
});