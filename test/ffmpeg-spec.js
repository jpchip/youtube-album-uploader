var fs = require('fs');
var FfmpegCommand = require('fluent-ffmpeg');
var chai = require('chai');
var expect = chai.expect;

var fileExists = require('../src/fileExists');

describe('ffmpeg', function() {
	
	describe('encode', function () {
		beforeEach(function(done) {
			this.timeout(50000);
			//ffmpeg -loop 1 -i test/anchor.jpg -i test/anchor.mp3 -c:v libx264 -c:v libx264 -c:a aac -strict experimental -b:a 192k -pix_fmt yuv420p -shortest out.mp4
			var command = new FfmpegCommand();
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
				console.log('Finished encoding');
				done();
			})
			.run();
		});
		
		afterEach(function() {
			if(fileExists('test/anchor.mp4')) {
				fs.unlink('test/anchor.mp4');
			}
		});
	
		it('should create mp4 from mp3 and image', function () {
			expect(fileExists('test/anchor.mp4')).to.equal(true);
		})
	});
	
	describe('concat', function () {
		beforeEach(function(done) {
			this.timeout(50000);
			//ffmpeg -i "concat:test/anchor.mp3|test/popular.mp3" -c copy concat.mp3
			var command = new FfmpegCommand();
			command
			.input('test/anchor.mp3')
			.input('test/popular.mp3')
			.on('end', function() {
				console.log('Finished concating');
				done();
			})
			.mergeToFile('test/concat.mp3', 'test');
		});
		
		afterEach(function() {
			if(fileExists('test/concat.mp3')) {
				fs.unlink('test/concat.mp3');
			}
		});
	
		it('should concat mp3 files', function () {
			expect(fileExists('test/concat.mp3')).to.equal(true);
		})
	});
	
});