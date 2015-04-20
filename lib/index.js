/**
 * Super-Roles
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var Role = require('./role');
var User = require('./user');
var debug = require('./debug')('index');


/**
 * SuperRoles
 *
 * @param {Object} options
 *   - {Boolean} strict
 */
function SuperRoles (options) {
  this._strict = !!options.strict;
  this._roles = {};
  debug('create: strict=%s', this._strict);
}

SuperRoles.prototype._getRole = function (name) {
  var role = this._roles[name];
  if (!role) throw new Error('role `' + name + '` does not exist');
  return role;
};

SuperRoles.prototype.role = function (name) {
  var role = new Role(this, name);
  this._roles[name] = role;
  return role;
};

SuperRoles.prototype.user = function () {
  return new User(this);
};

/**
 * 初始化中间件
 *
 * @param {Object} options
 *   - {Function} request
 *   - {Function} allow
 *   - {Function} forbid
 * @return {Function}
 */
SuperRoles.prototype.middleware = function (options) {
  if (typeof options.request !== 'function') throw new Error('missing parameter `request`');
  if (typeof options.allow !== 'function') {
    options.allow = function (req, res, next) {
      debug('default middleware: allow');
      next();
    };
  }
  if (typeof options.forbid !== 'function') {
    options.forbid = function (req, res, next) {
      debug('default middleware: forbid');
      next('Forbidden');
    };
  }

  return function (req, res, next) {
    options.request(req, res, function (err, user) {
      if (err) return options.forbid(req, res, next);
      req.userRole = user;
      options.allow(req, res, next);
    });
  };
};


module.exports = exports = SuperRoles;
