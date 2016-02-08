var rootpath = require('rootpath')();
var expect = require('chai').expect
var Doc = require('model/document');

describe('Test document model', function() {

	var doc;
	beforeEach(function() {
		doc = new Doc();
	});

	describe('Document status', function() {
		it('Should set 2 when call "created"', function(done) {
			doc.created();
			expect(doc.getStatus()).to.equal(2);
			done();
		});

		it('Should set 1 when call "inProgress"', function(done) {
			doc.inProgress();
			expect(doc.getStatus()).to.equal(1);
			done();
		});

		it('Should set 0 when call "done"', function(done) {
			doc.done();
			expect(doc.getStatus()).to.equal(0);
			done();
		});
	});


});