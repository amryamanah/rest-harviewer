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

exports.uploadForm = function(req,res){
	res.writeHead(200, {'content-type': 'text/html'});
	res.write(
		'<form action="/harviewer/upload" enctype="multipart/form-data" method="post">'+
			'<input type="text" name="title"><br>'+
			'<input type="file" name="file" multiple="multiple"><br>'+
			'<input type="submit" value="Upload">'+
			'</form>'
	);
	res.end();
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
    res.json(200,{total: har.length ,result: har });
  });
};


//TODO Refactor to more simple handler
exports.request = function(req,res){
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
		res.json(200,binder.getAllRequest(har));
	});
};

exports.redirect = function(req,res){
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
		res.json(200,binder.getAllRedirect(har));
	});
};

exports.badrequest = function(req,res){
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
		res.json(200,binder.getAllBadRequest(har));
	});
};

exports.fullloadtime = function(req,res){
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
		res.json(200,binder.getAllFullLoadTime(har));
	});
};

exports.onloadtime = function(req,res){
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
		res.json(200,binder.getAllOnLoadTime(har));
	});
};

exports.contentloadtime = function(req,res){
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
		res.json(200,binder.getAllContentLoadTime(har));
	});
};

exports.timetofirstbyte = function(req,res){
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
		res.json(200,binder.getAllTimeToFirstByte(har));
	});
};

exports.dnstime = function(req,res){
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
		res.json(200,binder.getAllDnsTime(har));
	});
};

exports.transfertime = function(req,res){
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
		res.json(200,binder.getAllTransferTime(har));
	});
};

exports.sendtime = function(req,res){
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
		res.json(200,binder.getAllSendTime(har));
	});
};

exports.servertime = function(req,res){
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
		res.json(200,binder.getAllServerTime(har));
	});
};

exports.avgconnecttime = function(req,res){
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
		res.json(200,binder.getAllAvgConnectTime(har));
	});
};

exports.avgblockingtime = function(req,res){
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
		res.json(200,binder.getAllAvgBlockingTime(har));
	});
};

exports.responsesize = function(req,res){
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
		res.json(200,binder.getAllResponseSize(har));
	});
};

exports.totaltextsize = function(req,res){
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
		res.json(200,binder.getAllTotalTextSize(har));
	});
};

exports.totalfontsize = function(req,res){
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
		res.json(200,binder.getAllTotalFontSize(har));
	});
};

exports.totalmediasize = function(req,res){
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
		res.json(200,binder.getAllTotalMediaSize(har));
	});
};

//function getAllLoadTime(har){
//	var allLoadTimes = [];
//	var fullLoadTime = {};
//	fullLoadTime.name = "fullLoadTime";
//	for (var i=0;i<har.length;i++) {
//		fullLoadTime["data" + i] = har[i].fullLoadTime;
//	}
//	allLoadTimes.push(fullLoadTime);
//	return allLoadTimes
//}



