var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var _ = require('underscore');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
    if ( err ) {
    } else {
      var dataArray = data.split('\n');
      if (dataArray[dataArray.length - 1] === '') {
        dataArray.pop();
      }
      callback(dataArray);
    }
  });
};

exports.isUrlInList = function(target, callback) {
  exports.readListOfUrls(function(data) {
    if ( data.indexOf(target) > -1 ) {
      callback(true);
    } else {
      callback(false);
    }
  });
  return true;  
};

exports.addUrlToList = function(url, callback) {
  var filePath = exports.paths.list;
  fs.appendFile(filePath, url, 'utf-8', function(err) {
    if (err) {
      throw err;
    }
    callback();  
  });
};

exports.isUrlArchived = function(url, cb) {
  fs.readFile(exports.paths.archivedSites + '/' + url, 'utf-8', function(error, data) {
    if (error) {
      return cb(false, url);
    } else {
      return cb(true, url);
    }
  });
};

exports.downloadUrls = function(urlArray) {
  for (var i = 0; i < urlArray.length; i++) {
    exports.isUrlArchived(urlArray[i], function(exist, url) {
      if (!exist) {
        request('http://' + url, function (error, response, body) {
          if (error) {
            throw error;
          } else if (!error && response.statusCode === 200 ) {
            fs.appendFile(exports.paths.archivedSites + '/' + url, body, function(error, data) {
              if (error) {
                throw err;
              }
            });
          } 
        });
      }
    });
  }
};

setInterval(function() {
  var downloadArray = [];
  exports.readListOfUrls(function(listArray) {
    exports.downloadUrls(listArray);
  });
}, 3000);
