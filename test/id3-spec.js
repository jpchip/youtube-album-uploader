var chai = require('chai');
var expect = chai.expect;

var id3 = require('id3js');

describe('id3', function() {
	var testTags;
	beforeEach(function(done) {
		this.timeout(50000);
		id3({ file: 'test/anchor.mp3', type: id3.OPEN_LOCAL }, function(err, tags) {
			testTags = tags;
			done();
		});
	});

	it('should get album title', function () {
		expect(testTags.album).to.equal('Short Music for Short People');
	})
	
	
	
});