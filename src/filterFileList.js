var fs = require('fs');
var path = require('path');

/**
* Searches directory for files with given extension.
* callback returns list of matching filenames in directory.
* @param {string} directory (eg. /path/to/music)
* @param {string} extension (eg. 'mp3')
* @param {filterFileList~requestCallback} callback
*/
module.exports = function (directory, extension, callback) {
    
    fs.readdir(directory, function(err, list) {
      if (err) {
         return callback(err);
      }
       
		var results = [];
		list.forEach(function(val, index) {
			var valExt = path.extname(val);
            if(valExt.toLowerCase() === '.' + extension.toLowerCase()) {
                results.push(val);
            }
        });
		callback(err, results);
    });
} 

/**
 * This callback is displayed as part of the filterFileList class.
 * @callback filterFileList~requestCallback
 * @param {null|*} err
 * @param {array} data list of found file names
 */