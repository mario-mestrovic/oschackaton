angular.module('teglanje').controller('challengesCtrl', ['$scope', 'challenges', function ($scope, challenges) {
    $scope.Challenges = challenges;
}]);

