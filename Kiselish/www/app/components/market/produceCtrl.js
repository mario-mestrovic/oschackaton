angular.module('teglanje').controller('produceCtrl', function ($scope, $rootScope, produces, ProgressService, cartService) {
    $scope.produces = produces;
    $scope.cartItems = [];

    $scope.refresh = function () {
        $scope.cartItems = cartService.cartItems;
        $rootScope.cartItems = cartService.cartItems;

    };
    $scope.addToCart = function (produce) {

        cartService.addToCart(produce);
        $scope.refresh();
    };

    $scope.refresh();
});

