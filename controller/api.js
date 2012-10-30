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
		if(error)res.send(500, { error: 'something blew up' });
		if(har.length === 0)res.send(404, {error :'File Not Found'});
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
	  if(err)res.send(500, { error: 'something blew up' });

    res.json(200,{total: har.length ,result: har });
  });
};

exports.show = function(req,res){

  parse = url.parse(req.url,true);

  HAR.find(parse.query,function (err, har) {
	  if(err)res.send(500, { error: 'something blew up' });
	  if(har.length === 0)res.send(404, {error :'File Not Found'});
    res.json(200,{total: har.length ,result: har });
  });
};

//exports.upload = function(req, res) {
//
//	console.log(req.files);
//	console.log(req.url);
//	var tmp_path = req.files.file.path;
//	var target_path = './' + req.files.file.name;
//	console.log(target_path);
//	fs.rename(tmp_path, target_path, function(err) {
//		if(err){
//			console.error(err);
//			res.send(500, { error: 'something blew up' });
//		}
//		fs.unlink(tmp_path, function() {
//			if(err){
//				console.error(err);
//				res.send(500, { error: 'something blew up' });
//			}
//
//			var harAnalyzer = new har.HarAnalyzer(target_path);
//			var data = new HAR(harAnalyzer);
//			data.save(function (err) {
//				if(err){
//					console.error(err);
//					res.send(500, { error: 'something blew up' });
//				}
//				fs.unlink(target_path,function(err){
//					if(err){
//						console.error(err);
//						res.send(500, { error: 'something blew up' });
//					}
//					console.log('Task saved.');
//					var options = {
//						protocol : req.protocol,
//						hostname : req.host,
//						port : 3002,
//						pathname : "harviewer"
//					};
//					res.redirect(url.format(options).trim());
//
//
//				});
//			});
//		});
//	});
//
//};

exports.upload2 = function(req,res){
  console.log(req.files);
	var tmp_path = req.files.file.path;
	var target_path = './' + req.files.file.name;

	async.series({
		one : function(callback){
			fs.rename(tmp_path,target_path,function(err){
				if(err){
					console.error(err);
					res.send(500, { error: 'Internal Server Error' });
				}
			});
			callback(null, 1 );
		},

		two: function(callback){
			fs.unlink(tmp_path, function(err) {
					if(err){
						console.error(err);
						res.send(500, { error: 'something blew up' });
					}
			});
			callback(null, 2);
		},

		three: function(callback){
			var harAnalyzer = new har.HarAnalyzer(target_path);
			var data = new HAR(harAnalyzer);
			data.save(function (err) {
				if(err){
					console.error(err);
					res.send(500, { error: 'something blew up' });
				}
			});
			callback(null, 3);
		},

		four: function(callback){
			fs.unlink(target_path,function(err){
				if(err){
					console.error(err);
					res.send(500, { error: 'something blew up' });
				}
			});
			callback(null,4);
		}
	},function(err,results){
		if(err){console.log(err)}
		console.log(results);
		res.send(200, {status:'OK'});
	});
};