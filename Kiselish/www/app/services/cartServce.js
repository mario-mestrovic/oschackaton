angular.module('teglanje')

.service('cartService', function (parseService) {

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

    this.getCartItems = function () {
        function onSuccess(response) {
            return cartItems = response;
        }
        function onError(error) {
            alert(JSON.stringify(error));
        }

        var promise = parseService.getCartItems(produce)
                        .then(onSuccess, onError);

        return promise;
    };

    this.refresh = function () {
        function onSuccess(response) {
            return cartItems = response;
        }
        function onError(error) {
            alert(JSON.stringify(error));
        }

        var promise = parseService.getCartItems(produce)
                        .then(onSuccess, onError);

        return promise;
    };

    this.addToCart = function (produce) {

        //function onSuccess(response) {
        //    return response;
        //}
        //function onError(error) {
        //    alert(JSON.stringify(error));
        //}

        //var promise = parseService.addToCart(produce)
        //     .then(_self.getCartItems)
        //     .then(onSuccess, onError);

        //return promise;

        _self.cartItems.push(produce);
    };
});