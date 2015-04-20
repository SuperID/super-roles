/**
 * Super-Roles
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var debug = require('./debug')('role');
var utils = require('./utils');


/**
 * User
 *
 * @param {Object} parent
 */
function User (parent) {
  this._parent = parent;
  this._rules = {};
  this._extends = {};
  debug('create');
}

/**
 * 继承角色
 *
 * @param {String} name
 * @return {Object}
 */
User.prototype.role = function (name) {
  debug('extend role: %s', name);
  var role = this._parent._getRole(name);
  this._rules = utils.merge(this._rules, role._rules);
  this._extends[name] = true;
  return this;
};

/**
 * 定义规则
 *
 * @param {Object} rules
 * @return {Object}
 */
User.prototype.define = function (rules) {
  debug('define: name=%s, rules=%j', this.name, rules);
  this._rules = utils.merge(this._rules, rules);
  return this;
};

User.prototype._getRule = function (name) {
  debug('get rule: name=%s', name);
  if (name in this._rules) {
    return !!this._rules[name];
  } else {
    debug('rule not define: name=%s, strict=%s', name, this._parent._strict);
    return !this._parent._strict;
  }
};

/**
 * 判断是否允许指定规则
 *
 * @param {String} name
 * @return {Boolean}
 */
User.prototype.allow = function (name) {
  return this._getRule(name);
};

User.prototype.can = User.prototype.allow;

/**
 * 判断是否禁止指定规则
 *
 * @param {String} name
 * @return {Boolean}
 */
User.prototype.forbid = function (name) {
  return !this._getRule(name);
};

User.prototype.cant = User.prototype.forbid;

/**
 * 判断是否为指定角色
 *
 * @param {String} name
 * @return {Boolean}
 */
User.prototype.is = function (name) {
  return !!this._extends[name];
};


module.exports = exports = User;
