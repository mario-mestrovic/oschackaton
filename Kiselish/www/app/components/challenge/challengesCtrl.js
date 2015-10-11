angular.module('teglanje').controller('challengesCtrl', ['$scope', 'challenges',  function ($scope, challenges) {
    $scope.Challenges = challenges;
    $scope.getImage = function (item) {
        return item.get('photo').url();
    };
}]);

