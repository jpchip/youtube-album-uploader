var chai = require('chai');
var expect = chai.expect;

var createVideoDescription = require('../src/createVideoDescription');

describe('createVideoDescription', function() {

	it('should return description for test mp3s', function () {
		expect(createVideoDescription([ 
			{ title: 'Anchor', trackNumber: '2', duration: 29.764 },
			{ title: 'All My Friends Are in Popular', trackNumber: '56', duration: 30.844 }
		])).to.equal('2. Anchor (00:00) \n56. All My Friends Are in Popular (00:29) \n');
	});
});