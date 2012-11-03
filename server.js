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
mongoose.connect('mongodb://nodejitsu:05fe459fc2e94f9344b67800525ad79a@alex.mongohq.com:10094/nodejitsudb424859154831');
//mongoose.connect('mongodb://localhost/rest-harviewer');

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

app.get('/', function(req,res){
	res.send(200,"WELCOME TO REST HARVIEWER");
});
app.get('/list', api.list);
app.get('/delete', api.delete);
app.get('/find', api.find);
app.get('/upload', api.uploadform);

app.post('/upload', api.upload);
app.delete('/delete', api.delete);
app.put('/upload', api.upload);

app.get('/harviewer/:label/:type',api.handler);

appPort = 8080;
//  And start the app on that interface (and port).
app.listen(appPort,function(err){
  if(err){
    console.log(err);
  }
  console.log("application started at " + appPort);
});



