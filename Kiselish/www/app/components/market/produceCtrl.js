angular.module('teglanje').controller('produceCtrl', function ($scope, produces, previousOrders, ProgressService, cartService) {
    $scope.produces = produces;
    $scope.previousOrders = previousOrders;

    $scope.addToCart = function (produce) {
        cartService.addToCart(produce);
    };
});

