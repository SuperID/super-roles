/**
 * Super-Cache
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var debug = require('./debug')('utils');


exports.merge = function () {
  var ret = {};
  for (var i = 0; i < arguments; i++) {
    var obj = arguments[i];
    for (var j in obj) {
      ret[j] = obj[j];
    }
  }
  return ret;
};
