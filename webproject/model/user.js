// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
		title		: String,
        email        : String,
		name		: String,
        password     : String,		
		salary		: String,
		yearattend	: String,
		gender		: String,
		faculty		: String,
		position	: String
    },
	education		: [{
		level		: String,
		degree		: String,
		university	: String,
		year		: String
	}],
	

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.updateUser = function(request, response){
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
userSchema.methods.editEducation = function(request, response){	
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
module.exports = mongoose.model('User', userSchema);













