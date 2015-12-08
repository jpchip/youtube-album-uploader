var FfmpegCommand = require('fluent-ffmpeg');

/**
* Takes an image and mp3 and converts it to an mp4
* @param {string} image path to image file (eg. /path/to/image.jpg)
* @param {string} audio path to audi file (eg. /path/to/audio.mp3)
* @param {string} output path to output file (eg. /path/to/output.mp4)
* @param {convert~requestCallback} callback
*/
module.exports = function (image, audio, output, callback) {
		
	var command = new FfmpegCommand();
	command
	.input(image)
	.inputOptions([
		'-loop 1',
	])
	.input(audio)
	.output(output)
	.outputOptions([
		'-c:v libx264',
		'-c:v libx264',
		'-c:a aac',
		'-strict experimental',
		'-b:a 192k',
		'-pix_fmt yuv420p',
		'-shortest'
	])
	.on('error', function(err) {
		//console.log('An error occurred: ' + err.message);
		callback(err, false);
	})
	.on('end', function() {
		//console.log('Created video!');
		callback(null, true);
	})
	.run();
}

/**
 * This callback is displayed as part of the convert class.
 * @callback convert~requestCallback
 * @param {null|*} err
 * @param {boolean} data true if convert was succesful
 */
