// app/models/works.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var workSchema = mongoose.Schema({
	nameUser	:	String,
	
	teachingwork	:[{
			qateaching	:[{
				academicYear	: Number,
				Semester		: Number,
				course_id		: mongoose.Schema.Types.ObjectId,
				course_name		: String
			}],
			advisor:[{
				project_name	: String,
				year			: Number,
				student_id		: mongoose.Schema.Types.ObjectId,
				degree			: String
			}]	
	}],
	research		:[{
			publicResearch	:[{
				research_name				 : String,
				partners					 : String,
				publish_on					 : String,
				level						 : String,
				name_of_conference_journal	 : String,
				detail						 : String,
				level_of_quality             : String
				
			}],
			advisor			:[{
				project_name	: String,
				year			: Number,
				student_id		: mongoose.Schema.Types.ObjectId,
				degree			: String,
			}],
			research_with_a_utilization_certificate :[{
				researcher							: String,
				topic								: String,
				agencies_organization_community		: String,
				utilization							: String,
				month_and_year_toUse				:String,			
			}],
			referenced: [{
				topic								: String,
				researcher							: String,
				type								: String,
				agencies_organization_community		: String,
				utilization							: String,
				month_and_year_toUse				:String,
				
			}],
			innocation: [{
				innovation_name					: String,
				name_of_award					: String,
				innovation_awards_department	: String,
				date							: Date			
			}],
			research_funding_from_external_agencies: [{
				topic								: String,
				from								: String,
				total_of_funds						: Number,
				total_of_funds_per_academicYear		: Number,
				start_date							:Date,
				end_date							:Date,
				period								:String			
			}],
			research_with_a_utilization_certificate: [{
				topic				: String,
				writer				: String,
				level				: String,
				name_of_journal		: String,
				detail				: String,
				level_of_quality	: String			
			}]		
	}],
	academic_services		:[{
			external_commitee:[{
				name_of_commiteeGroup	: String,
				position 				: String,
				department 				: String,
				level					: String,
				start_date			    : Date,
				end_date 				: Date			
			}],
			goverment_agenciesAndpublicOganizaion_commitee:[{
				name_of_commiteeGroup	: String,
				position 				: String,
				department 				: String,
				level 					: String,
				start_date 				: Date,
				end_date 				: Date
				
			}],
			goverment_agenciesAndpublicOganizaion_advisor:[{
				name_of_advisor			: String,
				department 				: String,
				level 					: String,
				start_date 				: Date,
				end_date 				: Date
				
			}],
			invited_to_adtendTheMeeting_as_expert:[{
				name_of_commiteeGroup	: String,
				department 				: String,
				level 					: String,
				start_date 				: Date,
				
			}],
			external_examining_board:[{
				name			: String,
				department		: String,
				level			: String,
				date 			: Date
			}],
			external_speaker:[{
				topic				: String,
				conference_title	: String,
				level				: String,
				organizer			: String,
				date				: Date
			}],
			external_quality_auditor:[{
				institution			: String,
				position_auditor	: String,
				type				: String,
				date				: Date
			}]
	}],
	studentActivity		:[{
			association_advisor:[{
				name				: String
			
			}],
			activity_advisor:[{
				name			: String,
				award			: String,
				department		: String,
				level			: String,
				date			: Date			
			}]
	
	}],
	other_work_responsibility		:[{
			directorsOfUniOrFac		:	[{
				nameOfDirectors		:	String,
				directorsLevel		:	String
			}],
			subDirectorsOfUniOrFac		:	[{
				nameOfSubDirectors	:	String,
				subDirectorsLevel	:	String
			}],
			AssignmentWithLetterFromDean	: 	[{
				nameOfAssignment	:	String
			}],
			LecturerOrganizedByOHR		:	[{
				topic				: 		String,
				dateOfLecturer		:		Date,
				practice			:		String
			}]	
	}],
	works_assigned_from_teachingAgency		:[{
			nameOfWork			:	String,
			detailsOfWork		:	String
	}],
	works_supported_of_Uni		:[{
			bureau 			:	String,
			position		:	String,
			detailsOfWork	:	String	
	}],
	special_reponsibility		:[{
			nameOfWork		:	String,
			detailsOfWork	:	String	
	}],
});



// create the model for users and expose it to our app
module.exports = mongoose.model('Work', workSchema);













