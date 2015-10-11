angular.module('teglanje').controller('previousCtrl', function ($scope, ProgressService, cartService) {
    $scope.previousItems = [];

    $scope.refresh = function () {
        $scope.previousItems = cartService.previousCartItems || [];
    };

    $scope.refresh();
});

