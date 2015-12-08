var upload = require('../src/upload');

upload('credentials.json', 'test/anchor.mp3', function (err, data) {
	console.log(err, data);
});