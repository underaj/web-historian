var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var ROOTPATH = __dirname + '/public';
var helpers = require('./http-helpers');
var fileType = require('file-type');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var urlParse = url.parse(req.url);
  // console.log(urlParse);

  if (urlParse.pathname === '/') {
    helpers.serveAssets(res, '/index.html', helpers.sendResponse);
  } else {
    helpers.serveAssets(res, urlParse.pathname, helpers.sendResponse);
  }
  // if ( req.method === 'GET' ) {
  //   if ( urlParse.pathname === '/' ) {
  //     statusCode = 200;
  //     fs.readFile( __dirname + '/public/index.html', function(err, data) {
  //       header = {'Content-Type': 'text/html'};
  //       res.writeHead(statusCode, header);
  //       res.write(data);
  //       res.end();
  //     });
  //   } else {
  //     fs.readFile( ROOTPATH + req.url, function(err, data) {
  //       if (err) {
  //         res.writeHead(404, header);
  //         res.end();
  //       } else {
  //         header = {'Content-Type': 'text/css'};
  //         statusCode = 200;
  //         res.writeHead(statusCode, header);
  //         res.write(data);
  //         res.end();
  //       }
  //     });
  //   }
  // }
};
