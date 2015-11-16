var User  = require('../model/user');
var Work  = require('../model/works');
var Fac   = require('../model/faculty');
var path = require('path');
var fs = require('fs');
//var busboy = require('connect-busboy');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('signin.ejs'); // load the sigin.ejs file
    });
	
	// Get path images
	app.get('/image.png', function (req, res) {
    		//res.sendfile(path.resolve('uploads/acnes.png'));
			res.sendfile(path.resolve('uploads/image_'+req.user._id+'.jpg'));
	});
	app.get('/imagelogo.jpg', function (req, res) {
    		res.sendfile(path.resolve('public/images/monkey.jpg'));
	});
	
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists     
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
		
		
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: 'signupMessage' });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	 // =====================================
    // HOME SECTION =====================
    // =====================================
       app.get('/home', isLoggedIn, function(req, res) {
		console.log("Get home");
        res.render('home.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    app.get('/profile', isLoggedIn, function(req, res) {
		console.log("Get profile");
        res.render('profile/userprofile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
	// =====================================
    // Edit Profile ========
    // =====================================
		app.get('/edit', isLoggedIn, function(req, res) {
			console.log( "Get editprofile");
			res.render('profile/edit.ejs', {
				user : req.user
			});
		});
		
		app.post('/edit',isLoggedIn, function (req, res){
			console.log( "Post editprofile");
			//console.log(req.files.file.path)
			user : req.user
			//if(req.busboy){
				/*console.log('Nothingg happend');
				//console.log(req.busboy);
				var fstream;
				//var busboy = new Busboy({headers: "Mhai eiei"});
				req.pipe(req.busboy);
				req.busboy.on('file', function (fieldname, file, filename) {
					console.log("Uploading: " + filename); 
					fstream = fs.createWriteStream(path.resolve('uploads/image_'+req.user._id+'.jpg'));
					console.log(fstream);
					file.pipe(fstream);
					fstream.on('close', function(err) {
						if (err){ console.log("Error Can't upload");}
						console.log("Upload completed!");
						res.redirect('/profile_inf');
					});
				});*/
			//}
			
		/*var tempPath = req.files.file.path,
			targetPath = path.resolve('uploads/'+req.files.file.originalFilename);
		var fstream;
		console.log(tempPath);
		if (path.extname(req.files.file.name).toLowerCase() === '.png') {
			fs.rename(tempPath, 'uploads/image_'+req.user._id, function(err) {
					if (err){ console.log("Error Can't upload");}
				else{console.log("Upload completed!");}
			});
		}*/
		User.findOne({ 'local.email' : req.body.email }, function(err, user) {
					if (err){ 
						console.log("Upload Failed!");
						return done(err);}
					
					if (user){
							console.log(req.body.email);
							console.log(req.body.nameuser);
							console.log(user);
							console.log("eiei");
							user.updateUser(req, res)

							
					}

			});
			
  		});
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
		console.log("Get logout");
        req.logout();
        res.redirect('/');
    });
	
	// =====================================
    // Get User Info. ==============================
    // =====================================
	app.get('/profile_inf',isLoggedIn,function(req,res){
		console.log("Get profile information");
		console.log( "Get Profile info");
		res.render('profile/profileinfo.ejs', {
            user : req.user // get the user out of session and pass to template
			
        });
	});
	//=====================================
    // Get QA Info. ==============================
    // =====================================
    app.get('/qapage',isLoggedIn,function(req,res){
		console.log( "Post QAPage(select year)");
		return Fac.find( function( err, faculty ) {
        if( !err ) {
			console.log(faculty);
            res.render('qa/qapage.ejs', {
			  user : req.user,
              faculty: faculty
            });
        } else {
            return console.log( err+"mhaieiei" );
	        }
	    });
	});
	
	app.post('/qahome',isLoggedIn,function(req,res){
		console.log( "Post QAHOME");
		console.log(req.body.programs);
		console.log(req.body.years);
		res.render('qa/qahome.ejs', {
            user : req.user, // get the user out of session and pass to template	
            programname :req.body.programs,
            year : req.body.years	

        });
	});
	app.get('/tqfhome',isLoggedIn,function(req,res){
		console.log( "Get TQFHOME");
		program = req.query.program;
		year = req.query.year;
		console.log(program);
		console.log(year);
		res.render('qa/tqfhome.ejs', {
            user : req.user, // get the user out of session and pass to template	
           	programname : program,
            year : year	
        });
	});
	app.get( '/tqf21',isLoggedIn, function( req, res ) {
		console.log( "Get TQF21");
		program = req.query.program;
		year = req.query.year;
		console.log(program);
		console.log(year);
		//find user in their programs
		return User.find({'local.faculty' : req.query.program }, function( err, clients ) {
        if( !err ) {
			console.log( "What happend here" );
			console.log(clients);
            res.render('qa/tqf21.ejs', {
			  user : req.user,
              clients: clients
            });
        } else {
            return console.log( err+"mhaieiei" );
	        }
	    });
	});
	app.get( '/tqf22',isLoggedIn, function( req, res ) {
		console.log( "Get TQF22");
		program = req.query.program;
		year = req.query.year;
		console.log(program);
		
		return Fac.findOne({
	     $and: [
	            { 'program_name' : program },
	            { 'academic_year' : year }
	          ]
	   }, function( err, programs ) {
        if( !err ) {
        	console.log(programs);
			console.log( "What happend here" );
            res.render('qa/tqf22.ejs', {
			  user : req.user,
              program: programs
            });
        } else {
        	//res.redirect('/fachome');
            return console.log( err+"mhaieiei" );
	        }
	    });
	 
	});
		
	
	//=====================================
    // Get Education Info. ==============================
    // =====================================
	app.get('/education_inf',isLoggedIn,function(req,res){
		console.log("Get education");
		res.render('profile/educationinfo.ejs', {
            user : req.user // get the user out of session and pass to template			
        });
	});
	//add education_inf
	app.get('/addedu',isLoggedIn,function(req,res){
		console.log("Add Education");
		res.render('profile/addeducation.ejs', {
            user : req.user // get the user out of session and pass to template			
        });
	});
	
	app.post('/addedu',isLoggedIn,function(req,res){
		console.log("Posttt Mhai eiei1234455678");
		/*User.findOne({ 'local.email' : req.body.email }, function(err, user) {
				if (err){ 
					console.log("Upload Failed!");
					return done(err);}
				
				if (user){
						console.log(req.body.level);
						console.log(req.body.degree);
						console.log(user);
						console.log("eiei");
						user.addEducation(req, res)
						
				}

		});*/
		User.update({ 'local.email' : req.body.email },
		{
		 "$push" : {
			"education" :  {
					 "level": req.body.level,
					 "degree": req.body.degree,
					 "university": req.body.university,
					 "year": req.body.year
				   } //inserted data is the object to be inserted 
			  }
			},{safe:true},
			  function (err, user) {
				if (err){console.log('mhaiiiiiii');}
			    else console.log(user);
		});
		res.redirect('/education_inf');
		
		
	});
	//edit education information.
	app.get('/editedu',isLoggedIn,function(req,res){
		console.log("Get Edit education");
		var i = 0;
		console.log(req.query.id);
		console.log(req.query.index);
		console.log(req.query.email);
		console.log(i);		
		res.render('profle/editedu.ejs', {
            user : req.user, // get the user out of session and pass to template
			index : req.query.id
        });
	});
	app.post('/editedu',isLoggedIn,function(req,res){
		console.log("Edit education");
		console.log(req.query.id);
		user : req.user		
		User.findOne({'local.email' : req.body.email },{ education: 1}, function(err, user) {
					if (err){ 
						console.log("Upload Failed!");
						return done(err);}
					
					if (user){
							console.log(user);
							console.log("eiei");
							user.editEducation(req, res)
							
					}

			});
	});
	//delete education information.
	app.get('/deledu',isLoggedIn,function(req,res){
		console.log("Delete Education");
		console.log(req.query.email);
		User.update({ 'local.email' : req.query.email },
		{
		 "$pull" : {
			"education" :  {
					 "_id": req.query.id,
					} //inserted data is the object to be inserted 
			  }
			},{safe:true},
			  function (err, user) {
				if (err){console.log('mhaiiiiiii');}
			    else console.log(user);
		});
		res.redirect('/education_inf');
		
		
	});
	//=====================================
    // Get Work Info. ==============================
    // =====================================
	app.get('/work_inf',isLoggedIn,function(req,res){
		console.log("Get Work Information");
		res.render('profle/workinfo.ejs', {
            user : req.user, // get the user out of session and pass to template		
			work : req.works
        });
	});
	app.get('/addwork',isLoggedIn,function(req,res){
		console.log("Add Work Information");
		res.render('profile/addwork.ejs', {
            user : req.user, // get the user out of session and pass to template	
			work : req.works
        });
	});
	app.post('/addwork',function(req,res){
		console.log("Add work......");
		//simple json record
		//var document = {idUser: req.query.id};
		//console.log(req.body.name);
		//console.log(document);
		//insert record
		/*Fac.findOne({ 'program_name' :  req.body.name }, function(err, fac) {
            // if there are any errors, return the error
            if (err){
				console.log("Error ...1");
			}
            // check to see if theres already a user with that email
            if (fac) {
				console.log("That fac is already have");
            } else {
                // if there is no user with that email
                // create the user
                var newFac  = new Fac();
                // set the user's local credentials
				newFac.program_name = req.body.name;
				newFac.program_year = req.body.year;
               	newFac.subject = array;	
                // save the user
                newFac.save(function(err,user) {
                    if (err){console.log('mhaiiiiiii');}
                    else console.log("Insert already"+user);
                });
            }

        });  */
		Work.update({ 'nameUser' : req.query.email },
		{
		 "$push" : {
			"works_assigned_from_teachingAgency" :  {
			
					 "nameOfWork": req.body.namework,
					 "detailsOfWork": req.body.details,
					
				   } //inserted data is the object to be inserted 
			  }
			},{safe:true},
			  function (err, user) {
				if (err){console.log('mhaiiiiiii');}
			    else console.log("Update already"+user);
		});
		res.redirect('/work_inf');
		
	
	});
	
	
	//=====================================
    // Get Course Info. ==============================
    // =====================================
	app.get('/course_inf',function(req,res){
		res.render('profile_inf.ejs', { message: req.flash('profile') });
	});
	
	//=====================================
    // Get Faculty Info(only admin). ==============================
    // =====================================
	app.get('/fachome',isLoggedIn,function(req,res){
		console.log("Get Faculty");
		return Fac.find( function( err, faculty ) {
        if( !err ) {
			console.log(faculty);
            res.render('faculty/faculty.ejs', {
			  user : req.user,
              faculty: faculty
            });
        } else {
            return console.log( err+"mhaieiei" );
	        }
	    });
	});
	
	app.get('/addprogram',isLoggedIn,function(req,res){
		console.log("Add Program");
		res.render('faculty/addprogram.ejs', {
            user : req.user // get the user out of session and pass to template	
			//fac : req.faculty //get faculty information
        });
	});
	app.post('/addprogram',function(req,res){
		console.log("Post Add work......");
		//simple json record
		//var document = {idUser: req.query.id};
		var i = 0;
		//var str = 'req.body.array'+i;
		console.log(req.body.name);
		//console.log(str);
		var arraysub = [];
		var array = req.body.array;
		console.log(array.length);
		for(i=0; i< array.length; i++){
			var test = JSON.parse(req.body.array[i])
			arraysub.push(test);	
		}
		console.log(arraysub);
		//console.log(document);
		//insert record
		Fac.findOne({ 'program_name' :  req.body.name }, function(err, fac) {
            // if there are any errors, return the error
            if (err){
				console.log("Error ...1");
			}
            // check to see if theres already a user with that email
            if (fac) {
				console.log("That fac is already have");
            } else {
                // if there is no user with that email
                // create the user
                var newFac        = new Fac();

                // set the user's local credentials
				newFac.program_name = req.body.name;
				newFac.program_year = req.body.year;
				newFac.academic_year = req.body.acyear;
               	newFac.subject = arraysub;	
                // save the user
                newFac.save(function(err,user) {
                    if (err){console.log('mhaiiiiiii');}
                    else console.log("Insert already"+user);
                });
            }

        });  
		/*Work.update({ 'nameUser' : req.query.email },
		{
		 "$push" : {
			"works_assigned_from_teachingAgency" :  {
			
					 "nameOfWork": req.body.namework,
					 "detailsOfWork": req.body.details,
					
				   } //inserted data is the object to be inserted 
			  }
			},{safe:true},
			  function (err, user) {
				if (err){console.log('mhaiiiiiii');}
			    else console.log("Update already"+user);
		});*/
		res.redirect('/fachome');
		
	
	});
	
	app.post('/showprogram',isLoggedIn,function(req,res){
		console.log("Post show program");
		console.log(req.body.programs);
		console.log(req.body.years)
		return Fac.findOne({
	     $and: [
	            { 'program_name' : req.body.programs },
	            { 'academic_year' : req.body.years }
	          ]
	   }, function( err, programs ) {
        if( !err ) {
        	console.log(programs);
			console.log( "What happend here" );
            res.render('faculty/showprogram.ejs', {
			  user : req.user,
              program: programs
            });
        } else {
        	//res.redirect('/fachome');
            return console.log( err+"mhaieiei" );
	        }
	    });
	 });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
