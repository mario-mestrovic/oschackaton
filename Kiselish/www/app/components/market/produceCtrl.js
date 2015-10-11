angular.module('teglanje').controller('produceCtrl', function ($scope, produces, ProgressService, cartService) {
    $scope.produces = produces;

    $scope.addToCart = function (produce) {
        cartService.addToCart(produce);
    };
});

