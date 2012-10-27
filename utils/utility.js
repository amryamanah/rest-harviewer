/**
 * Created with PyCharm.
 * User : amryfitra
 * Email: amryfitra@gmail.com
 * Date : 10/27/12
 * Time : 12:10 PM
 * To change this template use File | Settings | File Templates.
 */



//exports.getConfig = function (configPath){
//  var fs = require('fs');
//  var configPath = configPath;
//  var oneIdParam = {
//    CUSTOM_CONFIGURATION : null,
//    ONE_ID_USER_NAME : null,
//    ONE_ID_EMAIL : null,
//    ENCODED_USER_LOGIN : null,
//    LANG : null,
//    SHOW_WELCOME : null,
//    EXPAND_SIDEMENU : null,
//    UUID : null,
//    INSTALLER_KEY : null,
//    FSIODATA : null,
//    READ_ONLY_MODE : null,
//    custom_l10n : null,
//    HOME_FOLDER : null,
//    WEB_ROOT : null
//  }
//
//  var config = function (){
//    raw = fs.readFileSync(configPath);
//    return JSON.parse(raw);
//  };
//
//  return {
//    config : config(),
//    oneIdparam : oneIdParam
//  }
//};

function getConfig(configPath){
  var fs = require('fs');
  var configPath = configPath;
  var oneIdParam = {
    CUSTOM_CONFIGURATION : null,
    ONE_ID_USER_NAME : null,
    ONE_ID_EMAIL : null,
    ENCODED_USER_LOGIN : null,
    LANG : null,
    SHOW_WELCOME : null,
    EXPAND_SIDEMENU : null,
    UUID : null,
    INSTALLER_KEY : null,
    FSIODATA : null,
    READ_ONLY_MODE : null,
    custom_l10n : null,
    HOME_FOLDER : null,
    WEB_ROOT : null
  }

  var config = function (){
    raw = fs.readFileSync(configPath);
    return JSON.parse(raw);
  };

  return {
    config : config(),
    oneIdparam : oneIdParam
  }
};

//
//
var amry = new getConfig('../sample/HEL_SLA_chrome1.har');

console.log(amry.config.log.pages[0].pageTimings);
////
////var url = require('url');
////
////var raw = "https://oneid.red.gtn/OneID/sso/2_0_0/oauth2/login/red-testidp?app_id=900bro&operator_key=666&redirect_url=https%3A%2F%2Fcp.red.gtn%2Findex.php&reg=1"
////var parse_url = url.parse(raw);
////console.log(parse_url);
