/**
 * Super-Roles Tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var should = require('should');
var SuperRoles = require('../');


describe('SuperRoles', function () {

  it('strict=false', function () {

    var roles = SuperRoles.create({strict: false});
    roles.role('a').define({
      a1: true,
      a2: true,
      a3: false,
      a8: false,
      a9: true
    });
    roles.role('b').define({
      a1: false,
      a2: false,
      a3: true,
      a4: true,
      a5: false,
    });
    roles.role('c').extend('a').define({
      a2: false,
      a3: true
    });
    roles.role('d').extend('a').extend('b').define({
      a6: true,
      a7: false
    });

    var user;

    user = roles.user().role('a');
    user.is('a').should.equal(true);
    user.is('e').should.equal(false);
    user.allow('a1').should.equal(true);
    user.allow('a2').should.equal(true);
    user.allow('a3').should.equal(false);
    user.allow('a4').should.equal(true); // undefined

    user = roles.user().role('b');
    user.is('b').should.equal(true);
    user.is('e').should.equal(false);
    user.allow('a1').should.equal(false);
    user.allow('a2').should.equal(false);
    user.allow('a3').should.equal(true);
    user.allow('a4').should.equal(true);
    user.allow('a5').should.equal(false);
    user.allow('a6').should.equal(true); // undefined

    user = roles.user().role('c');
    user.is('c').should.equal(true);
    user.is('e').should.equal(false);
    user.allow('a1').should.equal(true);
    user.allow('a2').should.equal(false);
    user.allow('a3').should.equal(true);
    user.allow('a4').should.equal(true); // undefined

    user = roles.user().role('a').role('b');
    user.is('a').should.equal(true);
    user.is('b').should.equal(true);
    user.is('e').should.equal(false);
    user.allow('a1').should.equal(false);
    user.allow('a2').should.equal(false);
    user.allow('a3').should.equal(true);
    user.allow('a4').should.equal(true);
    user.allow('a5').should.equal(false);
    user.allow('a8').should.equal(false);
    user.allow('a9').should.equal(true);
    user.allow('a10').should.equal(true); // undefined

  });

  it('strict=true', function () {

    var roles = SuperRoles.create({strict: true});
    roles.role('a').define({
      a1: true,
      a2: true,
      a3: false,
      a8: false,
      a9: true
    });
    roles.role('b').define({
      a1: false,
      a2: false,
      a3: true,
      a4: true,
      a5: false,
    });
    roles.role('c').extend('a').define({
      a2: false,
      a3: true
    });
    roles.role('d').extend('a').extend('b').define({
      a6: true,
      a7: false
    });

    var user;

    user = roles.user().role('a');
    user.is('a').should.equal(true);
    user.is('e').should.equal(false);
    user.allow('a1').should.equal(true);
    user.allow('a2').should.equal(true);
    user.allow('a3').should.equal(false);
    user.allow('a4').should.equal(false); // undefined

    user = roles.user().role('b');
    user.is('b').should.equal(true);
    user.is('e').should.equal(false);
    user.allow('a1').should.equal(false);
    user.allow('a2').should.equal(false);
    user.allow('a3').should.equal(true);
    user.allow('a4').should.equal(true);
    user.allow('a5').should.equal(false);
    user.allow('a6').should.equal(false); // undefined

    user = roles.user().role('c');
    user.is('c').should.equal(true);
    user.is('e').should.equal(false);
    user.allow('a1').should.equal(true);
    user.allow('a2').should.equal(false);
    user.allow('a3').should.equal(true);
    user.allow('a4').should.equal(false); // undefined

    user = roles.user().role('a').role('b');
    user.is('a').should.equal(true);
    user.is('b').should.equal(true);
    user.is('e').should.equal(false);
    user.allow('a1').should.equal(false);
    user.allow('a2').should.equal(false);
    user.allow('a3').should.equal(true);
    user.allow('a4').should.equal(true);
    user.allow('a5').should.equal(false);
    user.allow('a8').should.equal(false);
    user.allow('a9').should.equal(true);
    user.allow('a10').should.equal(false); // undefined

  });

});
