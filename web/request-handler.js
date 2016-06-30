var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var helpers = require('./http-helpers');
// var fileType = require('file-type');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var urlParse = url.parse(req.url);
  var urlPath = urlParse.pathname;
  
  //POST
  if (req.method === 'POST') {
    var data = '';
    req.on('data', function(datachunk) {
      data += datachunk;
    });

    req.on('end', function() {
      targetUrl = data.split('=')[1];
      archive.isUrlInList(targetUrl, function(exists) {
        if (!exists) {
          archive.addUrlToList(targetUrl + '\n', function() {
            console.log('added!');
          });
        }
        helpers.headers.location = targetUrl;
        res.writeHead(302, helpers.headers);
        res.end();
      });
    });
  }

  //GET
  if ( req.method === 'GET') {
    if (urlPath === '/') {
      helpers.serveAssets(res, archive.paths.siteAssets + '/index.html', helpers.sendResponse);
    } else if (urlPath.slice(0, 4) === '/www') {
      archive.isUrlArchived(urlPath, function(exists) {
        if (exists) {
          console.log('here');
          helpers.serveAssets(res, archive.paths.archivedSites + urlPath, helpers.sendResponse, 'text/html');
        } else {
          helpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', helpers.sendResponse);
        }
      });
    } else {
      helpers.serveAssets(res, archive.paths.siteAssets + urlPath, helpers.sendResponse);
    }
  }
};