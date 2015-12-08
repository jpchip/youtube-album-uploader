var Youtube = require("youtube-api"),
Fs = require("fs"),
ReadJson = require("r-json"),
Lien = require("lien"),
Opn = require("opn");

/**
* @param {string} credentialsPath (eg. credentials.json)
* @param {string} videoPath (eg. video.mp4)
* @param {function} callback
*/
module.exports = function (credentialsPath, videoPath, callback) {

	// Copy the downloaded JSON file in `credentials.json`
	const CREDENTIALS = ReadJson(credentialsPath);

	// Init the lien server
	var server = new Lien({
		host: "localhost"
	  , port: 5000
	});

	// Authenticate using the credentials
	var oauth = Youtube.authenticate({
		type: "oauth"
	  , client_id: CREDENTIALS.web.client_id
	  , client_secret: CREDENTIALS.web.client_secret
	  , redirect_url: CREDENTIALS.web.redirect_uris[0]
	});

	// Open the authentication url in the default browser
	Opn(oauth.generateAuthUrl({
		access_type: "offline"
	  , scope: ["https://www.googleapis.com/auth/youtube.upload"]
	}));

	// Here we're waiting for the OAuth2 redirect containing the auth code
	server.page.add("/oauth2callback", function (lien) {
		console.log("Trying to get the token using the following code: " + lien.search.code);

		// Get the access token
		oauth.getToken(lien.search.code, function(err, tokens) {
			if (err) { lien.end(err, 400); return console.log(err); }

			// Set the credentials
			oauth.setCredentials(tokens);

			// And finally upload the video! Yay!
			Youtube.videos.insert({
				resource: {
					// Video title and description
					snippet: {
						title: "Testing YoutTube API NodeJS module"
					  , description: "Test video upload via YouTube API"
					}
					// I don't want to spam my subscribers
				  , status: {
						privacyStatus: "private"
					}
				}
				// This is for the callback function
			  , part: "snippet,status"

				// Create the readable stream to upload the video
			  , media: {
					body: Fs.createReadStream(videoPath)
				}
			}, function (err, data) {
				if (err) { return lien.end(err, 400); }
				lien.end(data);
				callback(err, data);
			});
		});
	});
}