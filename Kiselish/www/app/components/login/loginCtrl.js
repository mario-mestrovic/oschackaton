angular.module('teglanje').controller('loginCtrl', function ($scope, NavigationService) {

    $scope.fbLogin = function () {

        function onSuccess(user) {
            if (!user.existed()) {
                alert("User signed up and logged in through Facebook!");
            } else {
                alert("User logged in through Facebook!");
            }
            NavigationService.goBack();
        };
        function onError(error) {
            alert("User cancelled the Facebook login or did not fully authorize.");
            NavigationService.goBack();
        }


        Parse.FacebookUtils.logIn(null, {
            success: onSuccess,
            error: onError
        });
    };
});

