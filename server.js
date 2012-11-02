/**
 * Created with PyCharm.
 * User : amryfitra
 * Email: amryfitra@gmail.com
 * Date : 10/27/12
 * Time : 11:36 AM
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var api = require('./controller/api.js');


//establish connection to mongo database
//mongoose.connect('mongodb://nodejitsu:05fe459fc2e94f9344b67800525ad79a@alex.mongohq.com:10094/nodejitsudb424859154831');
mongoose.connect('mongodb://localhost/rest-harviewer');

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	}
	else {
		next();
	}
};


app.configure(function () {
	app.use(allowCrossDomain);
	app.use(express.bodyParser({uploadDir:'./'}));
  app.use(express.methodOverride());
  app.use(app.router);
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.use(express.static(__dirname + '/public'));
});

// set up the RESTful API, handler methods are defined in api.js
//app.get('/harviewer/save', api.save);
app.get('/harviewer', api.list);

//example use http://localhost:3002/harviewer/find/?_id=508d524fb4c88d9f0e000003
app.get('/harviewer/find', api.show);
app.get('/harviewer/sort', api.sort);

//example use http://localhost:3002/harviewer/delete/?_id=508d524fb4c88d9f0e000003

app.get('/harviewer/delete', api.delete);

app.delete('/harviewer/delete', api.delete);

app.get('/harviewer/upload', function(req,res){
	res.writeHead(200, {'content-type': 'text/html'});
	res.write(
		'<form action="/harviewer/upload" enctype="multipart/form-data" method="post">'+
			'<input type="text" name="title"><br>'+
			'<input type="file" name="file" multiple="multiple"><br>'+
			'<input type="submit" value="Upload">'+
			'</form>'
	);
	res.end();
});
app.put('/haviewer/upload', api.upload2);

app.post('/harviewer/upload', api.upload2);

appPort = 8080;
//  And start the app on that interface (and port).
app.listen(appPort,function(err){
  if(err){
    console.log(err);
  }
  console.log("application started at " + appPort);

});



