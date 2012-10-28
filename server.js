/**
 * Created with PyCharm.
 * User : amryfitra
 * Email: amryfitra@gmail.com
 * Date : 10/27/12
 * Time : 11:36 AM
 * To change this template use File | Settings | File Templates.
 */


var express = require('express');
var mongoose = require('mongoose');
var app = express();
var api = require('./controller/api.js');


dbhost = 'localhost';
//establish connection to mongo database
mongoose.connect('mongodb://localhost/rest-harviewer');

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

// set up the RESTful API, handler methods are defined in api.js
app.get('/harviewer/save', api.save);
app.get('/harviewer/', api.list);
app.get('/harviewer/find', api.show);

appPort = 3002;
//  And start the app on that interface (and port).
app.listen(appPort,function(err){
  if(err){
    console.log(err);
  }
  console.log("application started at " + 3002);

});

