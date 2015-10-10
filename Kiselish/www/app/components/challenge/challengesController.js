angular.module('teglanje').controller('challengesController', ['$scope', 'challenges', function ($scope, challenges) {
    $scope.Challenges = challenges;
}]);

