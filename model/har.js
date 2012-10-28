/**
 * Created with PyCharm.
 * User : amryfitra
 * Email: amryfitra@gmail.com
 * Date : 10/27/12
 * Time : 11:39 AM
 * To change this template use File | Settings | File Templates.
 */



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var harSchema = new Schema({
  name: String,
  date: {type: Date, default: Date.now},
  timeOnLoad: Number,
  timeOnContentLoad: Number,
  entry: {
    dnsTime:Number,
    transferTime:Number,
    sendTime:Number,
    serverTime:Number,
    AvgConnectTime:Number,
    AvgBlockingTime:Number,
    responseSize:Number,
    timeToFirstByte:Number,
    fullLoadTime:Number,
    request:Number,
    redirect:Number,
    badRequest:Number,
    totalTextSize:Number,
    totalFontSize:Number,
    totalMediaSize:Number
  }
});
harSchema.set('toJSON', { getters: true, virtuals: false });

module.exports = mongoose.model('HAR', harSchema);