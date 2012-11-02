/**
 * Created with PyCharm.
 * User  : amryfitra
 * Email : amryfitra@gmail.com
 * Date  : 11/2/12
 * Time  : 10:26 PM
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var async = require('async');
var moment = require('moment');

exports.entryAnalyzer = function(entry){
	var request = entry.length;
	var min_timestamp = Math.pow(10,14);
	var max_timestamp = 0;
	var time_start = null;
	var time_stop = null;

	function getDnsTime(){
		//getting total dns time
		var totalDnsTime = 0 ;
		async.forEach(entry , function calculateDns(x, callback){
			totalDnsTime = totalDnsTime + Math.max(x.timings.dns,0);
		},function(err){console.log(err)});
		return totalDnsTime;
	}

	function getTransferTime(){
		//getting total transfer time
		var totalTransferTime = 0;
		async.forEach(entry, function calculateTransfer(x,callback){
			var receiveTime = Math.max(x.timings.receive,0);
			var sendTime = Math.max(x.timings.send,0);
			totalTransferTime = totalTransferTime + (receiveTime - sendTime);
		},function(err){console.log(err)});
		return totalTransferTime;
	}

	function getSendTime(){
		//getting time spend to send
		var totalSendTime = 0;
		async.forEach(entry, function calculateSend(x,callback){
			totalSendTime = totalSendTime + Math.max(x.timings.send,0);
		},function(err){console.log(err)});
		return totalSendTime;
	}

	function getServerTime(){
		//getting time spend in the server
		var totalServerTime = 0;
		async.forEach(entry, function calculateServer(x,callback){
			totalServerTime = totalServerTime + Math.max(x.timings.wait,0);
		},function(err){console.log(err)});
		return totalServerTime;
	}

	function getConnectingTime(){
		//getting connect time
		var totalConnectTime = 0;
		async.forEach(entry, function calculateConnect(x,callback){
			totalConnectTime = totalConnectTime + Math.max(x.timings.connect,0);
		},function(err){console.log(err)});
		return totalConnectTime;
	}

	function getBlockingTime(){
		//getting block time
		var totalBlockingTime = 0;
		async.forEach(entry, function calculateBlock(x,callback){
			totalBlockingTime = totalBlockingTime + Math.max(x.timings.blocked,0);
		},function(err){console.log(err)});
		return totalBlockingTime;
	}

	function getResponseSize(){
		var totalResponzeSize = 0;
		async.forEach(entry,function calculateResponse(x,callback){
			var compressed_size = Math.max(x.response.bodySize, 0);
			if (compressed_size === 0){
				totalResponzeSize = totalResponzeSize + Math.max(x.response.content.size, 0);
			}
			else{
				totalResponzeSize = totalResponzeSize + compressed_size;
			}
		},function(err){console.log(err)});
		return totalResponzeSize / 1024.0;
	}

	function timeToFirstByte(){
		var timeToFirstByte = 0;
		var count = 0;

		async.forEach(entry,function(x,callback){
			count = count +1;
//        console.log(count);
			var raw_date = x.startedDateTime;
			var start = moment(raw_date);
			var completed = moment(raw_date).add('milliseconds', x.time);

			if(completed.unix() > max_timestamp){
				max_timestamp = completed.unix();
				time_stop = completed;
			}
			if(start.unix() < min_timestamp){
				min_timestamp = start.unix();
				time_start = start;
				var blockingtime = Math.max(x.timings.blocked,0);
				var dnstime = Math.max(x.timings.dns,0);
				var connecttime = Math.max(x.timings.connect,0);
				var sendtime = Math.max(x.timings.send,0);
				var servertime = Math.max(x.timings.wait,0);

				timeToFirstByte= blockingtime+dnstime+connecttime+sendtime+servertime;
			}

		},function(err){console.log(err)});
		return timeToFirstByte;

	}

	function getRedirect(){
		//getting redirection
		var redirect = 0;
		async.forEach(entry, function calculateRedirect(x,callback){
			if(x.response.status >= 300 && x.response.status < 400){
				redirect = redirect + 1;
			}
		},function(err){console.log(err)});
		return redirect;
	}

	function getBadRequest(){
		//getting redirection
		var badRequest = 0;
		async.forEach(entry, function calculateRedirect(x,callback){
			if(x.response.status > 400){
				badRequest = badRequest + 1;
			}
		},function(err){console.log(err)});
		return badRequest;
	}

	function getTextSize(){
		var totalTextSize = 0;
		async.forEach(entry,function(x,callback){
			var mime = x.response.content.mimeType.toLowerCase();

			if(mime.search("text") >= 0 || mime.search("javascript") >= 0 || mime.search("html") >= 0 || mime.search("json") >= 0 || mime.search("xml") >= 0 ){
				var compressed_size = Math.max(x.response.bodySize, 0);
				if (compressed_size === 0){
					totalTextSize = totalTextSize + Math.max(x.response.content.size, 0);
				}
				else{
					totalTextSize = totalTextSize + compressed_size;
				}
			}
		},function(err){console.log(err)});
		return totalTextSize/1024.0;
	}

	function getFontSize(){
		var totalFontSize = 0;
		async.forEach(entry,function(x,callback){
			var mime = x.response.content.mimeType.toLowerCase();

			if(mime.search("font") >= 0){
				var compressed_size = Math.max(x.response.bodySize, 0);
				if (compressed_size === 0){
					totalFontSize = totalFontSize + Math.max(x.response.content.size, 0);
				}
				else{
					totalFontSize = totalFontSize + compressed_size;
				}
			}
		},function(err){console.log(err)});
		return totalFontSize/1024.0;
	}

	function getMediaSize(){
		var totalMediaSize = 0;
		async.forEach(entry,function(x,callback){
			var mime = x.response.content.mimeType.toLowerCase();

			if(mime.search("image") >= 0 ){
				var compressed_size = Math.max(x.response.bodySize, 0);
				if (compressed_size === 0){
					totalMediaSize = totalMediaSize + Math.max(x.response.content.size, 0);
				}
				else{
					totalMediaSize = totalMediaSize + compressed_size;
				}
			}
		},function(err){console.log(err)});
		return totalMediaSize/1024.0;
	}

	return {
		dnsTime : getDnsTime(),
		transferTime : getTransferTime(),
		sendTime : getSendTime(),
		serverTime : getServerTime(),
		AvgConnectTime : Math.abs(getConnectingTime()/request),
		AvgBlockingTime : Math.abs(getBlockingTime()/request),
		responseSize : getResponseSize(),
		timeToFirstByte : timeToFirstByte(),
		fullLoadTime : time_stop.diff(time_start),
		request: request,
		redirect : getRedirect(),
		badRequest : getBadRequest(),
		totalTextSize : Math.ceil(getTextSize()),
		totalFontSize : Math.ceil(getFontSize()),
		totalMediaSize : Math.ceil(getMediaSize())
	}
}