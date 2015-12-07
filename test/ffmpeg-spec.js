var fs = require('fs');
var FfmpegCommand = require('fluent-ffmpeg');
var chai = require('chai');
var expect = chai.expect;

var command = new FfmpegCommand();

describe('ffmpeg', function() {
	
	describe('encode', function () {
		beforeEach(function(done) {
			this.timeout(50000);
			//ffmpeg -loop 1 -i test/anchor.jpg -i test/anchor.mp3 -c:v libx264 -c:v libx264 -c:a aac -strict experimental -b:a 192k -pix_fmt yuv420p -shortest out.mp4
			command
			.input('test/anchor.jpg')
			.inputOptions([
				'-loop 1',
			])
			.input('test/anchor.mp3')
			.output('test/anchor.mp4')
			.outputOptions([
				'-c:v libx264',
				'-c:v libx264',
				'-c:a aac',
				'-strict experimental',
				'-b:a 192k',
				'-pix_fmt yuv420p',
				'-shortest'
			])
			.on('end', function() {
				console.log('Finished processing');
				done();
			})
			.run();
		});
		
		afterEach(function() {
			fs.unlink('test/anchor.mp4');
		});
	
		it('should create mp4 from mp3 and image', function () {
			var stats = fs.lstatSync('test/anchor.mp4');
			expect(stats.isFile()).to.equal(true);
		})
	});

});