rest-harviewer
==============

##Installation:
   > npm install

##API GUIDE:

+-------------------------+*-----------------------------*+------------------+--------------------+
|     Resources           |        GET                    |       POST       |       DELETE       |
+-------------------------+*-----------------------------*+------------------+--------------------+
| /                       | Welcome mesage                |                  |                    |
| /upload                 | Upload form                   |    upload file   |                    |
| /list                   | List all files                |                  |                    |
| /delete/?label=name     | Delete * w/ label             |                  | Delete * w/ label  |
| /harviewer/:label/:type | label = "labelname"           |                  |                    |
|                         | type = "datatype"             |                  |                    |
|                         | return list of data w/        |                  |                    |
|                         | "type" which label = "label"  |                  |                    |
+-------------------------+-------------------------------+------------------+--------------------+

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