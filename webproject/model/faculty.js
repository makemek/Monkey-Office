// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var facSchema = mongoose.Schema({

    program_name	: String,
	program_year	: Number,
	academic_year	: Number,
	subject		: [{
		sub_code	: String,
		sub_name	: String,
		sub_semes	: Number,
		sub_lecter	: String,
		sub_credit	: Number		
	}],
	

});


facSchema.methods.updateUser = function(request, response){
	this.local.title = request.body.title;
	this.local.name = request.body.nameuser;
	this.local.position = request.body.position;
	this.local.gender = request.body.gender;
	this.local.salary = request.body.salary;
	this.local.yearattend = request.body.year;
	this.local.faculty = request.body.faculty;
	 console.log(this.local.name);
	this.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
		
    });
	 console.log("Eieiei");
	response.redirect('/profile_inf');
};
facSchema.methods.editEducation = function(request, response){	
	console.log("Eieiei555");	
	var index = request.query.id;
	console.log(index);
	this.education[index].level = request.body.level;
	this.education[index].degree = request.body.degree;
	this.education[index].university = request.body.university;
	this.education[index].year = request.body.year;
	 
	this.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
		
    });
	console.log("Eieiei");
	response.redirect('/education_inf');


};
// create the model for users and expose it to our app
module.exports = mongoose.model('Faculty', facSchema);













