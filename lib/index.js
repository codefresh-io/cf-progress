"use strict";

(function() {
    var root = this;
    var previous_CfProgress = root.CfProgress;

    //Initializing 3rd party dependencies
    var has_require = typeof require !== 'undefined';
    var Firebase = root.Firebase;
    var Q = root.Q;
    if( typeof Firebase === 'undefined' ) {
        if( has_require ) {
            Firebase = require('firebase');
        }
        else throw new Error('cf-progress requires firebase, see http://firebase.com');
    }
    if( typeof Q === 'undefined' ) {
        if( has_require ) {
            Q = require('q');
        }
        else throw new Error('cf-progress requires Q, see https://github.com/kriskowal/q');
    }

    var CfProgress = function(job) {
        if (!job){
            throw new Error("CfProgress requires jobId");
        }
    };

    CfProgress.init = function(url, secret){
        if (!url){
            throw new Error("CfProgress requires firebase url");
        }
        else if (!secret){
            throw new Error("CfProgress requires firebase secret");
        }

        var jobIdRef = new Firebase(url);
        jobIdRef.authWithCustomToken(secret, function(error) {
            if (error) {
                throw new Error("CfProgress login to Firebase failed. Caused by: " + error.toString());
            } else {
                console.log("CfProgress login to Firebase succeeded");
            }
        });
    };

    CfProgress.noConflict = function() {
        root.CfProgress = previous_CfProgress;
        return CfProgress;
    };

    if( typeof exports !== 'undefined' ) {
        if( typeof module !== 'undefined' && module.exports ) {
            exports = module.exports = CfProgress;
        }
        exports.CfProgress = CfProgress;
    }
    else {
        root.CfProgress = CfProgress;
    }

}).call(this); // jshint ignore:line