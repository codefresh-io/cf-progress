var chai       = require('chai');
var expect     = chai.expect;
var sinon      = require('sinon'); // jshint ignore:line
var sinonChai  = require('sinon-chai');
chai.use(sinonChai);
var cfProgress = require('../lib/index');


describe('initial', function () {

    it('should test', function () {
        var progress = new cfProgress();
        var res = progress.test();
        expect(res).to.equal(2);
    });

});