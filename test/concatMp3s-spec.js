var chai = require('chai');
var expect = chai.expect;

var fs = require('fs');
var concatMp3s = require('../src/concatMp3s');

describe('concatMp3s', function() {
	
	describe('concatMp3s', function() {
		var results;
		beforeEach(function(done) {
			this.timeout(50000);
			concatMp3s('test', 'test/output.mp3', function(err, data) {
				if (data) {
					results = data;
				}
				done();
			});
		});
		
		afterEach(function() {
			fs.unlink('test/output.mp3');
		});

		it('should create output.mp3', function () {
			var stats = fs.lstatSync('test/output.mp3');
			expect(stats.isFile()).to.equal(true);
			expect(results).to.be.true;
		});
	});
	
	describe('error', function() {
		var results, error;
		beforeEach(function(done) {
			this.timeout(50000);
			concatMp3s('test/ss', 'test/outputError.mp3', function(err, data) {
				results = data;
				error = err;
				done();
			});
		});

		it('should not create output.mp3', function () {
			expect(results).to.be.false;
			expect(error).to.not.be.null;
		});
	});
	
	
	
	
});