var albumInfo = require('./albumInfo');
var path = require('path');
var FfmpegCommand = require('fluent-ffmpeg');

/**
* Gets all mp3s in a directory and concats them into output file.
* @param {string} directory (eg. /path/to/music/folder)
* @param {string} output (eg. output.mp3)
* @param {function} callback
*/
module.exports = function (directory, output, callback) {
	
	albumInfo(directory, function(err, data) {
		if (err) {
			callback(err, false);
			return;
		}
		
		var command = new FfmpegCommand();
		data.tracks.forEach(function(track) {
			command.input(track.path);
		});
			
		command
		.on('error', function(err) {
			//console.log('An error occurred: ' + err.message);
			callback(err, false);
		})
		.on('end', function() {
			//console.log('Finished concating');
			callback(err, true);
		})
		.mergeToFile(output, directory);
		
	});
} 
