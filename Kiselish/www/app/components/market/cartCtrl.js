angular.module('teglanje').controller('cartCtrl', function ($scope, cartService) {
    $scope.addedToCart = cartService.cartItems || [];


});

