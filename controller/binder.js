/**
 * Created with PyCharm.
 * User  : amryfitra
 * Email : amryfitra@gmail.com
 * Date  : 11/2/12
 * Time  : 11:24 PM
 * To change this template use File | Settings | File Templates.
 */

var async = require('async');

//TODO Refactor to more simple handler

exports.getAllFullLoadTime = function(har){
	var allLoadTimes = [];
	var fullLoadTime = {};
	fullLoadTime.name = "fullLoadTime";
	async.forEach(har, function (x, callback){
		fullLoadTime[x.filename] = x.fullLoadTime;
	},function(err) {
		console.log(err)
	});
	allLoadTimes.push(fullLoadTime);
	return allLoadTimes;
};

exports.getAllOnLoadTime = function(har){
	var allOnLoadTime = [];
	var onLoadTime = {};
	onLoadTime.name = "onLoadTime";
	async.forEach(har, function (x, callback){
		onLoadTime[x.filename] = x.timeOnLoad;
	},function(err) {
		console.log(err)
	});
	allOnLoadTime.push(onLoadTime);
	return allOnLoadTime;
};

exports.getAllContentLoadTime = function(har){
	var allContentLoadTime = [];
	var contentLoadTime = {};
	contentLoadTime.name = "contentLoadTime";
	async.forEach(har, function (x, callback){
		contentLoadTime[x.filename] = x.timeOnContentLoad;
	},function(err) {
		console.log(err)
	});
	allContentLoadTime.push(contentLoadTime);
	return allContentLoadTime;
};

exports.getAllDnsTime = function(har){
	var allDnsTime = [];
	var dnsTime = {};
	dnsTime.name = "dnsTime";
	async.forEach(har, function (x, callback){
		dnsTime[x.filename] = x.dnsTime;
	},function(err) {
		console.log(err)
	});
	allDnsTime.push(dnsTime);
	return allDnsTime;
};

exports.getAllTransferTime = function(har){
	var allTransferTime = [];
	var transferTime = {};
	transferTime.name = "transferTime";
	async.forEach(har, function (x, callback){
		transferTime[x.filename] = x.transferTime;
	},function(err) {
		console.log(err)
	});
	allTransferTime.push(transferTime);
	return allTransferTime;
};

exports.getAllSendTime = function(har){
	var allSendTime = [];
	var sendTime = {};
	sendTime.name = "sendTime";
	async.forEach(har, function (x, callback){
		sendTime[x.filename] = x.sendTime;
	},function(err) {
		console.log(err)
	});
	allSendTime.push(sendTime);
	return allSendTime;
};

exports.getAllServerTime = function(har){
	var allServerTime = [];
	var serverTime = {};
	serverTime.name = "serverTime";
	async.forEach(har, function (x, callback){
		serverTime[x.filename] = x.serverTime;
	},function(err) {
		console.log(err)
	});
	allServerTime.push(serverTime);
	return allServerTime;
};

exports.getAllAvgConnectTime = function(har){
	var allAvgConnectTime = [];
	var AvgConnectTime = {};
	AvgConnectTime.name = "AvgConnectTime";
	async.forEach(har, function (x, callback){
		AvgConnectTime[x.filename] = x.AvgConnectTime;
	},function(err) {
		console.log(err)
	});
	allAvgConnectTime.push(AvgConnectTime);
	return allAvgConnectTime;
};

exports.getAllRequest = function(har){
	var allRequest = [];
	var request = {};
	request.name = "request";
	async.forEach(har, function (x, callback){
		request[x.filename] = x.request;
	},function(err) {
		console.log(err)
	});
	allRequest.push(request);
	return allRequest;
};

exports.getAllRedirect = function(har){
	var allRedirect = [];
	var redirect = {};
	redirect.name = "redirect";
	async.forEach(har, function (x, callback){
		redirect[x.filename] = x.redirect;
	},function(err) {
		console.log(err)
	});
	allRedirect.push(redirect);
	return allRedirect;
};

exports.getAllBadRequest = function(har){
	var allBadRequest = [];
	var badRequest = {};
	badRequest.name = "redirect";
	async.forEach(har, function (x, callback){
		badRequest[x.filename] = x.badRequest;
	},function(err) {
		console.log(err)
	});
	allBadRequest.push(badRequest);
	return allBadRequest;
};

exports.getAllTimeToFirstByte = function(har){
	var allTimeToFirstByte = [];
	var timeToFirstByte = {};
	timeToFirstByte.name = "timeToFirstByte";
	async.forEach(har, function (x, callback){
		timeToFirstByte[x.filename] = x.timeToFirstByte;
	},function(err) {
		console.log(err)
	});
	allTimeToFirstByte.push(timeToFirstByte);
	return allTimeToFirstByte;
};

exports.getAllAvgBlockingTime = function(har){
	var allAvgBlockingTime = [];
	var AvgBlockingTime = {};
	AvgBlockingTime.name = "AvgBlockingTime";
	async.forEach(har, function (x, callback){
		AvgBlockingTime[x.filename] = x.AvgBlockingTime;
	},function(err) {
		console.log(err)
	});
	allAvgBlockingTime.push(AvgBlockingTime);
	return allAvgBlockingTime;
};

exports.getAllResponseSize = function(har){
	var allResponseSize = [];
	var responseSize = {};
	responseSize.name = "responseSize";
	async.forEach(har, function (x, callback){
		responseSize[x.filename] = x.responseSize;
	},function(err) {
		console.log(err)
	});
	allResponseSize.push(responseSize);
	return allResponseSize;
};

exports.getAllTotalTextSize = function(har){
	var allTotalTextSize = [];
	var totalTextSize = {};
	totalTextSize.name = "totalTextSize";
	async.forEach(har, function (x, callback){
		totalTextSize[x.filename] = x.totalTextSize;
	},function(err) {
		console.log(err)
	});
	allTotalTextSize.push(totalTextSize);
	return allTotalTextSize;
};

exports.getAllTotalFontSize = function(har){
	var allTotalFontSize = [];
	var totalFontSize = {};
	totalFontSize.name = "totalFontSize";
	async.forEach(har, function (x, callback){
		totalFontSize[x.filename] = x.totalFontSize;
	},function(err) {
		console.log(err)
	});
	allTotalFontSize.push(totalFontSize);
	return allTotalFontSize;
};

exports.getAllTotalMediaSize = function(har){
	var allTotalMediaSize = [];
	var totalMediaSize = {};
	totalMediaSize.name = "totalMediaSize";
	async.forEach(har, function (x, callback){
		totalMediaSize[x.filename] = x.totalMediaSize;
	},function(err) {
		console.log(err)
	});
	allTotalMediaSize.push(totalMediaSize);
	return allTotalMediaSize;
};