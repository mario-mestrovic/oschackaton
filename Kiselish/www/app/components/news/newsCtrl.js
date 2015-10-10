angular.module('teglanje').controller('newsCtrl', ['$scope', 'news', 'NavigationService', function ($scope, news, navigationService) {
    $scope.News = news;
    $scope.click = function (item) {
        if (item.get("type") == "winner")
            navigationService.navigateTo('home.articleWinner', { articleId: item.id }, null);
        else
            navigationService.navigateTo('home.article', { articleId: item.id }, null);
    }
}]);

