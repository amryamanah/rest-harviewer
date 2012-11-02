/**
 * Created with PyCharm.
 * User : amryfitra
 * Email: amryfitra@gmail.com
 * Date : 10/27/12
 * Time : 12:10 PM
 * To change this template use File | Settings | File Templates.
 */

var async = require('async');
var fs = require('fs');
var HAR = require('../model/har.js');
var url = require('url');
var har = require('../utils/harAnalyzer.js');


exports.delete = function(req,res){
	parse = url.parse(req.url,true);

	HAR.find(parse.query,function (error, har) {
		if(error){
      res.send(500, { error: 'something blew up' });
    }
		if(har.length === 0){
      res.send(404, {error :'File Not Found'});
    }
		else{
			HAR.remove(parse.query,function(err) {
				if(err)notFound(err);
				console.log(parse.query);
				res.send('200',{status :"Delete request for " + JSON.stringify(parse.query) + " success"} );
			});
		}
	});
};

exports.list = function(req,res){

  HAR.find(function (err, har) {
	  if(err){
      res.send(500, { error: 'something blew up' });
    }
    res.json(200,{total: har.length ,result: har });
  });
};

exports.show = function(req,res){

  parse = url.parse(req.url,true);
  HAR.find(parse.query,function (err, har) {
	  if(err){
      res.send(500, { error: 'something blew up' });
    }
	  if(har.length === 0){
      res.send(404, {error :'File Not Found'});
    }
    res.json(200,{total: har.length ,result: har });
  });
};

exports.sort = function(req,res){

  parse = url.parse(req.url,true);
  console.log(parse);
  HAR.find(parse.query,function (err, har) {
    if(err) {
      res.send(500, {
        error: 'something blew up'
      });
    }

    if(har.length === 0) {
      res.send(404, {error :'File Not Found'});
    }

    var allLoadTimes = [];
    var fullLoadTime = {};
    fullLoadTime.name = "fullLoadTime";
    for (var i=0;i<har.length;i++) {
      fullLoadTime["data" + i] = har[i].entry.fullLoadTime;
    }
    allLoadTimes.push(fullLoadTime);
    res.json(200,allLoadTimes);
  });
};


exports.upload = function(req, res) {
  var tmp_path = req.files.file.path;
  var target_path = './' + req.files.file.name;
  fs.rename(tmp_path, target_path, function(err) {
    if(err){
      res.send(500, { error: 'something blew up' });
    }
    fs.unlink(tmp_path, function() {
      if(err){
        res.send(500, { error: 'something blew up' });
      }
      analyze(res,target_path);
    });
  });
};

function analyze(res,target_path){
  var harAnalyzer = new har.HarAnalyzer(target_path);
  var data = new HAR(harAnalyzer);
  data.save(function (err) {
    if(err){
      res.send(500, { error: 'something blew up' });
    }
    fs.unlink(target_path,function(err){
      if(err){
        res.send(500, { error: 'something blew up' });
      }
      res.send(200,{status : "upload success"})


    });
  });
}

