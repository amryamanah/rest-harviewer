/**
 * Created with PyCharm.
 * User  : amryfitra
 * Email : amryfitra@gmail.com
 * Date  : 11/2/12
 * Time  : 11:24 PM
 * To change this template use File | Settings | File Templates.
 */

var async = require('async');

function handle(x,name){
	var result_type = [];
	result_type["request"] = x.request;
	result_type["redirect"] = x.redirect;
	result_type["badrequest"] = x.badRequest;

	result_type["fullloadtime"] = x.fullLoadTime;
	result_type["onloadtime"] = x.timeOnLoad;
	result_type["oncontentloadtime"] = x.timeOnContentLoad;
	result_type["timetofirstbyte"] = x.timeToFirstByte;
	result_type["dnstime"] = x.dnsTime;
	result_type["transfertime"] = x.transferTime;
	result_type["sendtime"] = x.sendTime;
	result_type["servertime"] = x.serverTime;
	result_type["avgconnecttime"] = x.AvgConnectTime;
	result_type["avgblockingtime"] = x.AvgBlockingTime;
	result_type["responsesize"] = x.responseSize;
	result_type["totaltextsize"] = x.totalTextSize;
	result_type["totalfontsize"] = x.totalFontSize;
	result_type["totalmediasize"] = x.totalMediaSize;

	return result_type[name];
}

exports.resultGetter2 = function(har,name){
	var allResult = [];
	var result = {};
	result.name = name;
	async.forEach(har, function (x, callback){
		result[x.filename] = handle(x,name);
	},function(err) {
		console.log(err)
	});
	allResult.push(result);
	return allResult;
};

exports.resultGetter = function(har,name){
	var allResult = [];
	var result = {};
	result.name = name;
	async.forEach(har, function (x, callback){
		result[x.filename]={
			data : handle(x,name),
		  datetime : x.date
		};
	},function(err) {
		console.log(err)
	});
	allResult.push(result);
	return allResult;
};
