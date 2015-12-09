#! /usr/bin/env node

/**
* Main file of application. Giving a path to a folder of mp3s,
* tries to concat them together, create a video, and upload it to youtube.
* @example youtube-album-uploader "/path/to/music/folder"
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
	if(!albumData) {
		console.log('Could not read metadata of mp3s in given directory.');
		return;
	}
	
	console.log('Creating video (this will take awhile)...');
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
				cleanUp();
			});
		});
	});
});

