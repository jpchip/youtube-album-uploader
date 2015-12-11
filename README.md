# youtube-album-uploader

A node CLI to upload an mp3 album to youtube. 

`youtube-album-uploader "/path/to/music/folder"`

## Getting Started

Requires [ffmpeg](https://www.ffmpeg.org/) be installed. On windows, make sure to add the following PATHs (with actual paths to whereever you installed ffmpeg):

    FFPROBE_PATH - C:\ffmpeg\bin\ffprobe.exe
    FFMPEG_PATH - C:\ffmpeg\bin\ffmpeg.exe

It also requires Google OAuth2 credentials. The basics of Google's OAuth2 implementation is explained on [Google Authorization and Authentication documentation](https://developers.google.com/accounts/docs/OAuth2Login). 

There is a [good tutorial here](https://www.codementor.io/nodejs/tutorial/uploading-videos-to-youtube-with-nodejs-google-api) on getting a credentials.json file. Once you download it, put in the root of the youtube-album-uploader directory.

If you happen to already have a CLIENT_ID, PROJECT_ID, and CLIENT_SECRET you can just copy `credentials.json.example` to `credentials.json` and replace these parameters.

## Installation

You can install youtube-album-uploader using npm:

    npm install -g youtube-album-uploader
    
## Usage 

Just pass the path to the directory containing your music. 

    youtube-album-uploader "path/to/album/folder"

on windows, maybe something like:

    youtube-album-uploader "C:\Documents and Settings\user\My Documents\My Music\music\My Own Band\My Bands Album"

It will look for a `folder.jpg` in the directory to use as the background of the created video.

When it finishes creating the video your browser should open and prompt you to sign in with your Google account and give youtube-album-uploader permission to upload on your behalf.

When everything is done you should get a `Video uploaded successfully!` message. You might have to manually kill the process after that (it's a known issue, sorry).

## Sponsors

Development is sponsored by [Earthling Interactive](http://earthlinginteractive.com/).

## Questions

If you have any questions, just [open an issue](https://github.com/jpchip/youtube-album-uploader/issues/new).

## Disclaimer

It is your responsibility to respect the copyright of any material uploaded with this app.  