var chai       = require('chai');
var expect     = chai.expect;
var sinon      = require('sinon'); // jshint ignore:line
var sinonChai  = require('sinon-chai');
chai.use(sinonChai);
var CfProgress = require('../lib/index');
var proxyquire = require('proxyquire').noCallThru();

describe('init - initialize CfProgress', function () {

    describe('positive', function(){

        it('should succeed when providing both url and secret', function () {
            var CfProgress = proxyquire('../lib/index', {
                'firebase': function(){
                    return {
                        child: function(){
                            return this;
                        },
                        set: function(){
                            return this;
                        },
                        authWithCustomToken: function(secret, callback){
                            callback();
                        }
                    };
                }
            });

            CfProgress.init("url", "secret");

        });

    });

    describe('negative', function(){

        it('should fail when not providing firebase url', function (done) {
            try{
                CfProgress.init();
            }
            catch(e){
                expect(e.toString()).to.equal("Error: CfProgress requires firebase url");
                return done();
            }
            throw new Error("should have failed");
        });

        it('should fail when not providing firebase secret', function (done) {
            try{
                CfProgress.init("url");
            }
            catch(e){
                expect(e.toString()).to.equal("Error: CfProgress requires firebase secret");
                return done();
            }
            throw new Error("should have failed");
        });

        it('should fail when authentication aginst firebase fails', function(done){

            var CfProgress = proxyquire('../lib/index', {
                'firebase': function(){
                    return {
                        child: function(){
                            return this;
                        },
                        set: function(){
                            return this;
                        },
                        authWithCustomToken: function(secret, callback){
                            callback(new Error("error from firebase lib"));
                        }
                    };
                }
            });

            try{
                CfProgress.init("url", "firebase");
            }
            catch(e){
                expect(e.toString()).to.equal("Error: CfProgress login to Firebase failed. Caused by: Error: error from firebase lib");
                return done();
            }
            throw new Error("should have failed");
        });

    });


});