angular.module('teglanje').controller('newsCtrl', ['$scope', 'news', function ($scope, news) {
    $scope.News = news;
}]);

