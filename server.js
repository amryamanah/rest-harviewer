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


dbhost = 'localhost';
//establish connection to mongo database
mongoose.connect('mongodb://localhost/rest-harviewer');

app.configure(function () {

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

appPort = 3002;
//  And start the app on that interface (and port).
app.listen(appPort,function(err){
  if(err){
    console.log(err);
  }
  console.log("application started at " + 3002);

});

