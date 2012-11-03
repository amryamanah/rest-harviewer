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
	parse = url.parse(req.url,true);
	console.log(parse)
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

exports.find = function(req,res){

  parse = url.parse(req.url,true);
	console.log(parse);
  HAR.find(parse.query,function (err, har) {
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
	handler_type["request"] = binder.resultGetter(har,"request");
	handler_type["redirect"] = binder.resultGetter(har,"redirect");
	handler_type["badrequest"] = binder.resultGetter(har,"badrequest");
	handler_type["fullloadtime"] = binder.resultGetter(har,"fullloadtime");
	handler_type["onloadtime"] = binder.resultGetter(har,"onloadtime");
	handler_type["oncontentloadtime"] = binder.resultGetter(har,"oncontentloadtime");
	handler_type["timetofirstbyte"] = binder.resultGetter(har,"timetofirstbyte");
	handler_type["dnstime"] = binder.resultGetter(har,"dnstime");
	handler_type["transfertime"] = binder.resultGetter(har,"transfertime");
	handler_type["sendtime"] = binder.resultGetter(har,"sendtime");
	handler_type["servertime"] = binder.resultGetter(har,"servertime");
	handler_type["avgconnecttime"] = binder.resultGetter(har,"avgconnecttime");
	handler_type["avgblockingtime"] = binder.resultGetter(har,"avgblockingtime");
	handler_type["responsesize"] = binder.resultGetter(har,"responsesize");
	handler_type["totaltextsize"] = binder.resultGetter(har,"totaltextsize");
	handler_type["totalfontsize"] = binder.resultGetter(har,"totalfontsize");
	handler_type["totalmediasize"] = binder.resultGetter(har,"totalmediasize");

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