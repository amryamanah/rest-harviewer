/**
 * Created with PyCharm.
 * User : amryfitra
 * Email: amryfitra@gmail.com
 * Date : 10/27/12
 * Time : 12:10 PM
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var HAR = require('../model/har.js');
var url = require('url');

exports.delete = function(req,res){
	parse = url.parse(req.url,true);
	console.log(parse);
	HAR.remove(parse.query,function(err) {
		if(err){
			console.error(err);
			res.send(404, 'Sorry, we cannot find that!');
		}
		res.send('200',"Delete request for " + parse.query + " success" );
	});
};

exports.list = function(req,res){
	console.log(req);
  console.log("list");
  HAR.find(function (err, har) {
	  if(err){
		  console.error(err);
		  res.send(404, 'Sorry, we cannot find that!');
	  }
    res.json({result: har, total: har.length});
  });
};

exports.show = function(req,res){
  console.log("this is find request");
  parse = url.parse(req.url,true);
  console.log(parse);
  HAR.find(parse.query,function (err, har) {
	  if(err){
		  console.error(err);
		  res.send(404, 'Sorry, we cannot find that!');
	  }
    console.log(har);
    res.json(har);
  });
};

exports.upload = function(req, res) {

	console.log(req.files);
	console.log(req.url);
	var tmp_path = req.files.file.path;
	var target_path = './' + req.files.file.name;
	console.log(target_path);
	fs.rename(tmp_path, target_path, function(err) {
		if(err){
			console.error(err);
			res.send(500, { error: 'something blew up' });
		}
		fs.unlink(tmp_path, function() {
			if(err){
				console.error(err);
				res.send(500, { error: 'something blew up' });
			}
			var har = require('../utils/harAnalyzer.js');
			var harAnalyzer = new har.HarAnalyzer(target_path);
			var data = new HAR(harAnalyzer);
			data.save(function (err) {
				if(err){
					console.error(err);
					res.send(500, { error: 'something blew up' });
				}
				fs.unlink(target_path,function(err){
					if(err){
						console.error(err);
						res.send(500, { error: 'something blew up' });
					}
					console.log('Task saved.');
					var options = {
						protocol : req.protocol,
						hostname : req.host,
						port : 3002,
						pathname : "harviewer"
					};
					res.redirect(url.format(options).trim());


				});
			});
		});
	});

}