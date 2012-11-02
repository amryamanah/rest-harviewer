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
//example use http://localhost:3002/harviewer/find/?_id=508d524fb4c88d9f0e000003
//example use http://localhost:3002/harviewer/delete/?_id=508d524fb4c88d9f0e000003
app.get('/harviewer', api.list);
app.get('/harviewer/delete', api.delete);
app.get('/harviewer/find', api.find);

app.get('/harviewer/upload', api.uploadForm);

app.post('/harviewer/upload', api.upload);

app.delete('/harviewer/delete', api.delete);

app.put('/haviewer/upload', api.upload);

//TODO Refactor to more simple handler
app.get('/harviewer/sort/request', api.request);
app.get('/harviewer/sort/redirect', api.redirect);
app.get('/harviewer/sort/badrequest', api.badrequest);
app.get('/harviewer/sort/fullloadtime', api.fullloadtime);
app.get('/harviewer/sort/onloadtime', api.onloadtime);
app.get('/harviewer/sort/contentloadtime', api.contentloadtime);
app.get('/harviewer/sort/timetofirstbyte', api.timetofirstbyte);
app.get('/harviewer/sort/dnstime', api.dnstime);

app.get('/harviewer/sort/transfertime', api.transfertime);
app.get('/harviewer/sort/sendtime', api.sendtime);
app.get('/harviewer/sort/servertime', api.servertime);
app.get('/harviewer/sort/avgconnecttime', api.avgconnecttime);
app.get('/harviewer/sort/avgblockingtime', api.avgblockingtime);
app.get('/harviewer/sort/responsesize', api.responsesize);
app.get('/harviewer/sort/totaltextsize', api.totaltextsize);
app.get('/harviewer/sort/totalfontsize', api.totalfontsize);
app.get('/harviewer/sort/totalmediasize', api.totalmediasize);



appPort = 8080;
//  And start the app on that interface (and port).
app.listen(appPort,function(err){
  if(err){
    console.log(err);
  }
  console.log("application started at " + appPort);

});



