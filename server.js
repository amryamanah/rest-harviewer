/**
 * Created with PyCharm.
 * User : amryfitra
 * Email: amryfitra@gmail.com
 * Date : 10/27/12
 * Time : 11:36 AM
 * To change this template use File | Settings | File Templates.
 */


var express = require('express');
var mongoose = require('mongoose');
var app = express();


var ipaddr  = process.env.IP || '127.0.0.1';
var port    = process.env.port || 3001;
var dbhost  = process.env.dbhost || '127.0.0.1';
var dbport  = process.env.dbport || 27017;
var dbuname = process.env.dbname || 'HAR';
var dbpwd   = process.env.dbpass || null;

//establish connection to mongo database
mongoose.connect('mongodb://'+dbuname+':'+dbpwd+'@'+dbhost+':'+dbport+'/nodetest');

var db = mongoose.Crea

