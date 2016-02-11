var rootpath = require('rootpath')();
var expect = require('chai').expect;

var mongoose = require('mongoose');
var config = require('test/dbTestConfig');
var db_test = mongoose.createConnection(config.host, config.database, config.port);
var Doc = require('model/document')(db_test);

describe('Test document model', function() {

	var authorX = 'x';
	var authorY = 'y';

	var doc1, doc2, doc3, doc4;
	var document;

	beforeEach(function() {
		// add dummy data
		doc1 = new Doc({
			'author': authorX,
			'name': 'x_doc1',
			'status': 0
		});

		doc2 = new Doc({
			'author': authorX,
			'name': 'x_doc2',
			'status': 0
		});

		doc3 = new Doc({
			'author': authorX,
			'name': 'x_doc3',
			'status': 0
		});

		doc4 = new Doc({
			'author': authorY,
			'name': 'y_doc1',
			'status': 0
		});

		doc1.save();
		doc2.save();
		doc3.save();
		doc4.save();


		Doc.findByAuthor(authorX, function(err, docs) {
			document = docs[0];
		});		
	})

	afterEach(function() {
		db_test.db.dropDatabase(function(err, result) {
			if(err)
				throw err;
		});
	});

	describe('static methods', function() {
		it('Should give documents owned by ' + authorX, function(done) {
			expectAuthorToHaveDoc(authorX, [doc1, doc2, doc3], done);
		});

		it('Should give documents owned by ' + authorY, function(done) {
			expectAuthorToHaveDoc(authorY, [doc4], done);
		});
	});

	describe('instance methods', function() {


		it('Should set document\'s status to "created"', function(done) {
			document.created();
			expect(document.getStatus()).to.equal(2);
			done();
		});

		it('Should set document\'s status to "in progress"', function(done) {
			document.inProgress();
			expect(document.getStatus()).to.equal(1);
			done();
		});

		it('Should set document\'s status to "done"', function(done) {
			document.done();
			expect(document.getStatus()).to.equal(0);
			done();
		});
	});
});

function expectAuthorToHaveDoc(authorName, docs, done) {
	Doc.findByAuthor(authorName, function(err, docs) {
		if(err)
			throw err;
		
		expect(docs.length).to.equal(docs.length);
		done();
	});	
}