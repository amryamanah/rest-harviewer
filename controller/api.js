/**
 * Created with PyCharm.
 * User : amryfitra
 * Email: amryfitra@gmail.com
 * Date : 10/27/12
 * Time : 12:10 PM
 * To change this template use File | Settings | File Templates.
 */


var HAR = require('../model/har.js');
var url = require('url');
exports.save = function(req, res) {
  console.log("this is post request");
  var har = require('../utils/harAnalyzer.js');
  var harAnalyzer = new har.HarAnalyzer(__dirname+"/HEL_SLA_chrome1.har");
  var data = new HAR(harAnalyzer);
  data.save(function (err) {
    if (err) throw err;
    console.log('Task saved.');

    res.send('HAR saved.');
  });
};

exports.list = function(req,res){
  console.log("this is find request");
  HAR.find(function (err, har) {
    if (err) {return console.log(err)}
      console.log(har);
//      res.writeHead(200,{"Content-Type" : "application/json"});
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