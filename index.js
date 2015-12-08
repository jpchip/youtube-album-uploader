/**
* Main file of app
* @example node index.js "/path/to/music/folder"
*/

var concatMp3s = require('./src/concatMp3s'),
albumInfo = require('./src/albumInfo'),
convert = require('./src/convert'),
fs = require('fs'),
path = require('path'),
upload = require('./src/upload');


var albumDir = process.argv[2];
if(albumDir === undefined) {
	console.log('Missing required path to album!');
	return;
}

function cleanUp () {
	if(fs.lstatSync('album.mp3').isFile()) {
		fs.unlink('album.mp3');
	}
	if(fs.lstatSync('album.mp4').isFile()) {
		fs.unlink('album.mp4');
	}
}

albumInfo(albumDir, function (err, albumData) {
	if(err) {
		console.log(err);
		return;
	}
	
	console.log('Creating video...');
	concatMp3s(albumDir, 'album.mp3', function(err, concatSuccess) {
		if(err) {
			console.log(err);
			cleanUp();
			return;
		}
		
		convert(albumData.albumArt, 'album.mp3', 'album.mp4', function(err, convertSuccess) {
			if(err) {
				console.log(err);
				cleanUp(); 
				return;
			}
			
			console.log('Uploading Video...');
			upload('credentials.json', 'album.mp4', {title: albumData.artist + " - " + albumData.album}, function (err, videoObj) {
				if(err) {
					console.log(err);
					cleanUp(); 
					return;
				}
				console.log('Video uploaded successfully!');
			});
		});
	});
});

