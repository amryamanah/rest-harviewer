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
var binder = require('./binder.js');
var exec = require('child_process').exec;



exports.handler = function (req,res){
	console.log("im in handler");
	console.log(req.params);
	var label = req.params.label;
	var type = req.params.type;

	key = {
		label : label
	};
	HAR.find(key,function (err, har) {
		if(err) {
			res.send(500, {
				error: 'something blew up'
			});
		}
		if(har.length === 0) {
			res.send(404, {error :'File Not Found'});
		}
		res.json(200,{
			success:true,
			count:har.length,
			results:mapping(type,har)
		});
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

exports.delete = function(req,res){
	key = {
		label : req.params.label
	};
	HAR.find(key,function (error, har) {
		if(error){
      res.send(500, { error: 'something blew up' });
    }
		if(har.length === 0){
      res.send(404, {error :'File Not Found'});
    }
		else{
			HAR.remove(key,function(err) {
				if(err)notFound(err);
				res.send('200',{status :"Delete request for " + JSON.stringify(key) + " success"} );
			});
		}
	});
};

exports.delete2 = function(req,res){
	key = {
		filename : req.params.label
	};
	HAR.find(key,function (error, har) {
		if(error){
			res.send(500, { error: 'something blew up' });
		}
		if(har.length === 0){
			res.send(404, {error :'File Not Found'});
		}
		else{
			HAR.remove(key,function(err) {
				if(err)notFound(err);
				res.send('200',{status :"Delete request for " + JSON.stringify(key) + " success"} );
			});
		}
	});
};

exports.find = function(req,res){
	key = {
		label : req.params.label
	};
	console.log(key);
  HAR.find(key,function (err, har) {
	  if(err){
      res.send(500, { error: 'something blew up' });
    }
	  if(har.length === 0){
      res.send(404, {error :'File Not Found'});
    }
    res.json(200,{total: har.length ,results: har });
  });
};

exports.uploadform = function(req,res){
	res.writeHead(200, {'content-type': 'text/html'});
	res.write(
		'<form action="/upload" enctype="multipart/form-data" method="post">'+
			'<input type="text" name="title"><br>'+
			'<input type="file" name="file" multiple="multiple"><br>'+
			'<input type="submit" value="Upload">'+
			'</form>'
	);
	res.end();
};

exports.list = function(req,res){
	HAR.find(function (err, har) {
		if(err){
			res.send(500, { error: 'something blew up' });
		}
		else{
			res.json(200,{total: har.length ,results: har });
		}
	});
};

function mapping(type,har){
	var handler_type = {};
	handler_type[type] = binder.resultGetter(har,type);

	return handler_type[type];
}

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


exports.runner = function(req,res){
	console.log(req.params.victim);
	var victim = "http://" + req.params.victim;
	var netsniff = __dirname + "/netsniff.js ";
	console.log(victim);
	console.log(netsniff);
	var result;
	result = exec('phantomjs ' + netsniff + victim + " > "+ req.params.victim+".har",function (err,stdout,stderr){
		if (err){
			console.log("some error" + err);
		}
		analyze(res,req.params.victim+".har");
	});

};