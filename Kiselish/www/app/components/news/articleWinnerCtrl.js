angular.module('teglanje').controller('articleWinnerCtrl', ['$scope', 'article', function ($scope, article) {
    $scope.Article = article;
    var winner = article.get("winner");
}]);

