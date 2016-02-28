"use strict";

(function() {
    var root = this;
    var previous_CfProgress = root.CfProgress;

    var has_require = typeof require !== 'undefined';

    var Firebase = root.Firebase;

    if( typeof Firebase === 'undefined' ) {
        if( has_require ) {
            Firebase = require('firebase')
        }
        else throw new Error('cf-progress requires firebase, see http://firebase.com');
    }

    var CfProgress = function(job) {
        var self = this;

        self.test = function(){
            return 2;
        };
    };

    CfProgress.prototype.init = function(url, secret){
        var jobIdRef = new Firebase(url);
        jobIdRef.authWithCustomToken(secret, function(error, authData) {
            if (error) {
                console.log("CF progress login to Firebase failed", error);
            } else {
                console.log("CF progress login to Firebase succeeded", authData);
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