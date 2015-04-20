/**
 * Super-Roles
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var SuperRoles = require('./lib/index');

module.exports = exports = SuperRoles;

exports.create = function (options) {
  return new SuperRoles(options);
};
