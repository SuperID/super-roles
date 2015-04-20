/**
 * Super-Roles
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var debug = require('./debug')('role');
var utils = require('./utils');


/**
 * Role
 *
 * @param {Object} parent
 * @param {String} name
 */
function Role (parent, name) {
  this._parent = parent;
  this.name = name;
  this._rules = {};
  debug('create: name=%s', name);
}

/**
 * 继承某个角色
 *
 * @param {String} name
 * @return {Object}
 */
Role.prototype.extend = function (name) {
  debug('extend: %s extend %s', this.name, name);
  var role = this._parent._getRole(name);
  this._rules = utils.merge(this._rules, role._rules);
  return this;
};

/**
 * 定义规则
 *
 * @param {Object} rules
 * @return {Object}
 */
Role.prototype.define = function (rules) {
  debug('define: name=%s, rules=%j', this.name, rules);
  this._rules = utils.merge(this._rules, rules);
  return this;
};


module.exports = exports = Role;
