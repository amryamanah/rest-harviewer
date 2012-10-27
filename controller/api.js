/**
 * Created with PyCharm.
 * User : amryfitra
 * Email: amryfitra@gmail.com
 * Date : 10/27/12
 * Time : 12:10 PM
 * To change this template use File | Settings | File Templates.
 */


var HAR = require('../model/har.js');


exports.post = function(req, res) {
  var har = new HAR(
    {
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
      bad_requests: Number,
      domains: Number
    }
  );
  dogtag.save(function (err) {
    if (err) throw err;
    console.log('Task saved.');

    res.send('Dogtag saved.');
  });
}