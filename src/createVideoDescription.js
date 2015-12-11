var fs = require('fs');

/**
* Creates video description based on track list
* @param {array} tracks
*/
module.exports = function (tracks) {
    function secondsToMinSecs(time) {
		var minutes = Math.floor(time / 60);
		var seconds = Math.floor(time % 60);
		function str_pad_left(string, pad, length) {
			return (new Array(length+1).join(pad)+string).slice(-length);
		}
		return str_pad_left(minutes.toString(),'0',2) + ':' + str_pad_left(seconds.toString(),'0',2);
	}

	var description = '', currentTime = 0;
	tracks.forEach(function(track, index) {
		description += track.trackNumber + '. ' + track.title + ' (' + secondsToMinSecs(currentTime) + ') ' + '\n';
		currentTime += track.duration;
	});
	
	return description;
} 