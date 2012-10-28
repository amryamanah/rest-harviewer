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
		if(err)throw err;
	});
};

exports.list = function(req,res){
  console.log("list");
  HAR.find(function (err, har) {
    if (err) {return console.log(err)}
      console.log(har);
      res.json(har);
  });
};

exports.show = function(req,res){
  console.log("this is find request");
  parse = url.parse(req.url,true);
  console.log(parse);
  HAR.find(parse.query,function (err, har) {
    if (err) {return console.log(err)}
      console.log(har);
      res.json(har);
  });
};

exports.upload = function(req, res) {
	var tmp_path = req.files.upload.path;
	var target_path = './' + req.files.upload.name;
	console.log(target_path);
	fs.rename(tmp_path, target_path, function(err) {
		if (err) throw err;
		fs.unlink(tmp_path, function() {
			if (err) throw err;
			var har = require('../utils/harAnalyzer.js');
			var harAnalyzer = new har.HarAnalyzer(target_path);
			var data = new HAR(harAnalyzer);
			data.save(function (err) {
				if (err) throw err;
				fs.unlink(target_path,function(err){
					if(err)throw err;
					console.log('Task saved.');
					res.send('File uploaded to: ' + target_path + ' - ' + req.files.upload.size + ' bytes'+ 'HAR saved.');
					res.send('HAR saved.');
				});
			});
		});
	});

}