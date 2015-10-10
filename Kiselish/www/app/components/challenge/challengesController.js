angular.module('teglanje').controller('challengesController', ['challenges', '$scope', function (challenges, $scope) {
    $scope.Challenges = challenges;
}]);

