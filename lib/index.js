"use strict";

(function() {
    var root = this;
    var previous_cfProgress = root.cfProgress;

    var cfProgress = function() {

    };

    cfProgress.noConflict = function() {
        root.cfProgress = previous_cfProgress;
        return cfProgress;
    };

    if( typeof exports !== 'undefined' ) {
        if( typeof module !== 'undefined' && module.exports ) {
            exports = module.exports = cfProgress
        }
        exports.cfProgress = cfProgress
    }
    else {
        root.cfProgress = cfProgress
    }

}).call(this);