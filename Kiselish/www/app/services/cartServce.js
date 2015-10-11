angular.module('teglanje')

.service('cartService', function ($rootScope, parseService) {

    function logError(error, options) {

        options = options || {};
        options.methodName = (options.methodName && options.methodName !== '') || 'apiCall';

        var message = options.methodName + ' failed: ' + JSON.stringify(error);

        //options.alert = true;
        //options.log = true;

        if (options.log) {
            console.log(message);
        }
        if (options.alert) {
            alert(message);
        }
    }
    function onApiServiceError(error, options) {
        if (!error) {
            return error;
        }

        //if (error.code === 209) {
        //    error.sessionError = true;
        //    Parse.User.logOut();
        //}

        logError(error, options);
        return error;
    }

    var _self = this;
    this.cartItems = [];

    this.addToCart = function (item) {
        
        var exists = false;
        for (var i = 0; i < _self.cartItems.length; i++) {
            var existing = _self.cartItems[i];
            if (existing.id && item.id && existing.id == item.id) {
                exists = true;
                continue;
            }
        }

        if (!exists) {
            _self.cartItems.push(item);
            _self.syncRootScope();
        }
    };

    this.syncRootScope = function () {
        $rootScope.cartItems = _self.cartItems;
    };

    _self.syncRootScope();
});