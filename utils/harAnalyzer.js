/**
 * Created with PyCharm.
 * User : amryfitra
 * Email: amryfitra@gmail.com
 * Date : 10/27/12
 * Time : 12:23 PM
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var async = require('async');

exports.HarAnalyzer =  function(harpath) {

  var harPath = harpath;


  function getHar(){
    raw = fs.readFileSync(harPath);
    return JSON.parse(raw);
  };

  function toKilobyte(size){
    return size/1024.0;
  }

  function getDnsTIme(har_input){
    dnsTime = har_input.timings.dns
    return Math.max()
  }

  function entryAnalyzer(entry){

    var request = entry.length;

    function getDnsTime(){
      //getting total dns time
      var totalDnsTime = 0 ;
      async.forEach(entry , function calculateDns(x, callback){
        totalDnsTime = totalDnsTime + Math.max(x.timings.dns,0);
      },function(err){console.log(err)});
      return totalDnsTime;
    };

    function getTransferTime(){
      //getting total transfer time
      var totalTransferTime = 0;
      async.forEach(entry, function calculateTransfer(x,callback){
        receiveTime = Math.max(x.timings.receive,0);
        sendTime = Math.max(x.timings.send,0);
        totalTransferTime = totalTransferTime + (receiveTime - sendTime);
      },function(err){console.log(err)});
      return totalTransferTime;
    };

    function getSendTime(){
      //getting time spend to send
      var totalSendTime = 0;
      async.forEach(entry, function calculateSend(x,callback){
        totalSendTime = totalSendTime + Math.max(x.timings.send,0);
      },function(err){console.log(err)});
      return totalSendTime;
    };

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
        compressed_size = Math.max(x.response.bodySize, 0);
        if (compressed_size === 0){
          totalResponzeSize = totalResponzeSize + Math.max(x.response.content.size, 0);
        }
        else{
          totalResponzeSize = totalResponzeSize + compressed_size;
        };
      },function(err){console.log(err)});
      return totalResponzeSize / 1024.0;
    };



    return {
      dnsTime : getDnsTime(),
      transferTime : getTransferTime(),
      sendTime : getSendTime(),
      serverTime : getServerTime(),
      AvgConnectTime : Math.abs(getConnectingTime()/request),
      AvgBlockingTime : Math.abs(getBlockingTime()/request),
      responseSize : getResponseSize(),
      request: request
    }
  }

  var analyze = function(){
    raw_har = getHar();
    entries = raw_har.log.entries;
    entry = entryAnalyzer(entries);
    name = raw_har.log.pages[0].id;
    onLoad = raw_har.log.pages[0].pageTimings.onLoad;
    onContentLoad = raw_har.log.pages[0].pageTimings.onContentLoad;
//    entry["response"]["bodySize"]


    return {
      name : name,
      timeOnLoad : onLoad,
      timeOnContentLoad : onContentLoad,
      entry: entry
    };
  };
  return analyze();
}





//function extractTime(entry){
//  var min_timestamp = Math.pow(10,14);
//  var max_timestamp = 0;
//  var timeToFirstByte = 0;
//  async.forEach(entry,function(x,callback){
//    raw_date = x.startedDateTime;
////    console.log(x.startedDateTime);
//    date = raw_date.split("T")[1];
//    //for firebug
//    raw_time1 = date.split('+')[0];
//    //for chrome developer tools
//    raw_time2 = raw_time1.split('Z')[0];
//    time = raw_time2.split(':');
//    hours = time[0];
//    minutes = time[1];
//    seconds = time[2].split('.')[0];
//    milliseconds = time[2].split('.')[1];
//    timeRequestStarted = seconds + (minutes*60) + (hours*3600000) + (milliseconds);
//    timeRequestCompleted = timeRequestStarted + (x.time);
//    start = timeRequestStarted/1000;
//    complete = timeRequestCompleted/1000;
////    console.log(start);
////    console.log(complete);
//    if(complete > max_timestamp){
//      max_timestamp = complete;
//    }else if(start < min_timestamp){
//      min_timestamp = start;
//      timeToFirstByte= Math.max(x.timings.blocked,0) + Math.max(x.timings.dns,0) + Math.max(x.timings.connect,0) + Math.max(x.timings.send,0)+Math.max(x.timings.wait,0)
//    }
//  },function(err){console.log(err)});
//  console.log(timeToFirstByte);
//  return timeToFirstByte;
//
//};


//var firefox = new HarAnalyzer('../sample/cp.blue.gtn.har');
//var chrome = new HarAnalyzer('../sample/HEL_SLA_chrome1.har');
//console.log(chrome);
////var dns_time = entryAnalyzer(chrome.entry);
////console.log(dns_time);
//////extractTime(chrome.entry);




