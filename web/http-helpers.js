var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var ROOTPATH = __dirname + '/public';
var mime = require('mime');
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
  var header = exports.headers;
  var statusCode = 200;

  fs.readFile(ROOTPATH + asset, function(err, data) {
    if (err) {
      callback(res, '', 404);
    } else {
      header['Content-Type'] = mime.lookup(ROOTPATH + asset);
      callback(res, data, statusCode, header);
    }
  });
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!

exports.sendResponse = function(response, data, statusCode, header) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, header);
  response.end(data);
};