var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var ROOTPATH = __dirname + '/public';
exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  var statusCode = 200;
  fs.readFile(ROOTPATH + asset, function(err, data) {
    if (err) {
      callback(res, '', 404);
    } else {
      callback(res, data, statusCode);
    }
  });
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!

exports.sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers['']);
  response.end(data);
};