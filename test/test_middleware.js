/**
 * Super-Roles Tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var should = require('should');
var SuperRoles = require('../');


describe('Middleware', function () {

  var roles = SuperRoles.create({strict: false});

  roles.role('a').define({
    'GET /a1': true,
    'GET /a2': false
  });

  it('normal', function (done) {

    var middleware = roles.middleware({
      request: function (req, res, callback) {
        callback(null, roles.user().role('a'));
      }
    });

    var req = {method: 'GET', _parsedOriginalUrl: {pathname: '/a1'}};
    var res = {};
    middleware(req, res, function (err) {
      should.not.exists(err);
      should.exists(req.userRole);

      req = {method: 'GET', _parsedOriginalUrl: {pathname: '/a2'}};
      res = {};
      middleware(req, res, function (err) {
        should.exists(err);
        should.exists(req.userRole);
        done();
      });
    });

  });

  it('customize allow & forbid', function (done) {

    var status = {allow: false, forbid: true};

    var middleware = roles.middleware({
      request: function (req, res, callback) {
        callback(null, roles.user().role('a'));
      },
      allow: function (req, res, next) {
        status.allow = true;
        next();
      },
      forbid: function (req, res, next) {
        status.forbid = true;
        next('Forbidden');
      }
    });

    var req = {method: 'GET', _parsedOriginalUrl: {pathname: '/a1'}};
    var res = {};
    middleware(req, res, function (err) {
      should.not.exists(err);
      should.exists(req.userRole);

      req = {method: 'GET', _parsedOriginalUrl: {pathname: '/a2'}};
      res = {};
      middleware(req, res, function (err) {
        should.exists(err);
        should.exists(req.userRole);

        status.allow.should.equal(true);
        status.forbid.should.equal(true);

        done();
      });
    });

  });

});
