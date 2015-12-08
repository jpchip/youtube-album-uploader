var chai = require('chai');
var expect = chai.expect;

var filterFileList = require('../src/filterFileList');

describe('filterFileList', function() {
	
	describe('success', function() {
		var results;
		beforeEach(function(done) {
			this.timeout(50000);
			filterFileList('test', 'mp3', function(err, data) {
				if (data) {
					results = data;
				}
				done();
			});
		});

		it('should find mp3s in test directory', function () {
			expect(results).to.include.members(['anchor.mp3','popular.mp3']);
		});
	});
	
	describe('error', function() {
		var results;
		beforeEach(function(done) {
			this.timeout(50000);
			filterFileList('test', 'dog', function(err, data) {
				results = data;
				done();
			});
		});

		it('should not find dog in the directory', function () {
			expect(results).to.be.empty;
		});
	});
	
	
	
	
});