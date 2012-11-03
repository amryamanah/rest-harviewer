rest-harviewer
==============

##Installation:
   > npm install

##API GUIDE:

- GET		/				Welcome Page
- GET		/list				List all data
- GET		/upload				Upload form
- POST		/upload				Upload, analyze, and save analyze result in database
- GET		/delete/?label="labelname"	delete all data with label="labelname"
- DELETE	/delete/?label="labelname"	delete all data with label="labelname"
- GET		/harviewer/:label/:type		return list of all datatype with label = "labelname"


## http://localhost:8080/harviewer/msn/request

> 		{
>		success: true,
>		results: [{
> 				name: "request",
>				malaysia.msn.com1.har: 98,
>				malaysia.msn.com.har: 115
>			 }]
>		}

## http://localhost:8080/list
'
 '	{
 > 		total: 1,
 > 		results: [{
 >				filename: "malaysia.msn.com1.har",
 >				label: "msn",
 >				request: 98,
 >				redirect: 4,
 >				badRequest: 0,
 >				fullLoadTime: 4000,
 >				timeOnLoad: 2437,
 >				timeOnContentLoad: 1081,
 >				timeToFirstByte: 497,
 >				dnsTime: 1506,
 >				transferTime: 6745,
 >				sendTime: 19,
 >				serverTime: 9865,
 >				AvgConnectTime: 49.46938775510204,
 >				AvgBlockingTime: 88.13265306122449,
 >				responseSize: 953.005859375,
 >				totalTextSize: 478,
 >				totalFontSize: 0,
 >				totalMediaSize: 440,
 >				_id: "5094d68c68a3530000000001",
 >				__v: 0,
 >				date: "2012-11-03T08:32:12.735Z"
 >			}]
 >	}
 >

## data type :
    - request
	- redirect
	- badrequest
    - fullloadtime
    - onloadtime
    - oncontentloadtime
    - timetofirstbyte
    - dnstime
    - transfertime
    - sendtime
    - servertime
    - avgconnecttime
    - avgblockingtime
	- responsesize
    - totaltextsize
    - totalfontsize
    - totalmediasize