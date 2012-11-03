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


## sample
- http://localhost:8080/harviewer/msn/request

> 		{
>		success: true,
>		results: [{
> 				name: "request",
>				malaysia.msn.com1.har: 98,
>				malaysia.msn.com.har: 115
>			 }]
>		}

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