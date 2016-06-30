var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var ROOTPATH = __dirname + '/public';
var helpers = require('./http-helpers');
var fileType = require('file-type');
var mime = require('mime');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var urlParse = url.parse(req.url);
  var urlPath = urlParse.pathname;
  // if req.url is a webpage url then we use the archive-helpers
  //POST

  if ( req.method === 'POST' && urlPath.slice(0, 4)) {
    var data = '';
    req.on('data', function(datachunk) {
      data += datachunk;
    });

    req.on('end', function() {
      var pathName = path.join(__dirname + '/../test/testdata/sites.txt');
      fs.appendFile(pathName, data.split('=')[1] + '\n', function(data) {
        res.writeHead(302);
        res.end();
      });
    });

  }





  //GET
  if ( req.method === 'GET') {
    if (urlPath === '/') {
      helpers.serveAssets(res, '/index.html', helpers.sendResponse);
    // } else if (urlPath === '/heyman') {
    //   res.writeHead(200);
    //   res.end('hello');
    } else if (urlPath.slice(0, 4) === '/www') {
      fs.readFile(__dirname + '/../test/testdata/sites.txt', 'utf-8', function(error, data) {
        if (error) {
          console.log('cant read file');
        }
        var dataText = data.split('\n');
        fs.readFile(__dirname + '/../test/testdata/sites' + urlPath, 'utf-8', function(error, data) {
          if (error) {
            console.log('cant read archive');
            helpers.serveAssets(res, '/loading.html', helpers.sendResponse);
          } else {
            res.writeHead(200);
            res.end(data);
          }
        });
      });
    } else {
      helpers.serveAssets(res, urlPath, helpers.sendResponse);
    }
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
