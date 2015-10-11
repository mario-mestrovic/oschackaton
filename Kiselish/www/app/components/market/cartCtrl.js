angular.module('teglanje').controller('cartCtrl', function ($scope, previousOrders, ProgressService, NavigationService, cartService, parseService) {
    $scope.addedToCart = [];
    $scope.previousOrders = previousOrders || [];

    $scope.checkout = function () {

        if (!parseService.IsLogedIn()) {
            NavigationService.navigateTo('login', null, null);
            return;
        }


        function onSuccess(response) {
            NavigationService.navigateTo('home.cartprevious');
            $scope.refresh();
        }
        function onError(error) {
            alert(JSON.stringify(error));
        }

       var promise = cartService.checkout()
            .then(onSuccess, onError);
        
       ProgressService.withProgress(promise);
    };

    $scope.refresh = function () {
        $scope.addedToCart = cartService.cartItems || [];
    };

    $scope.refresh();
});

