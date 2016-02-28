var proxyquire = require('proxyquire').noCallThru();
var Q          = require('q');
var chai       = require('chai');
var expect     = chai.expect;
var sinon      = require('sinon');
var sinonChai  = require('sinon-chai');
chai.use(sinonChai);
var cfProgress = require('../lib/index');


describe('initial', function () {

    it('should test', function (done) {
        var progress = new cfProgress();
        progress.test();
        done();
    });

});