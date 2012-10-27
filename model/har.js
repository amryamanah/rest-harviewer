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
  description: String,
  date: {type: Date, default: Date.now},
  full_load_time: Number,
  total_dns_time: Number,
  total_transfer_time: Number,
  total_server_time: Number,
  avg_connecting_time: Number,
  avg_blocking_time: Number,
  total_size: Number,
  text_size: Number,
  media_size: Number,
  cache_size: Number,
  redirects: Number,
  request: Number,
  bad_requests: Number,
  domains: Number
});

module.exports = mongoose.model('HAR', harSchema);