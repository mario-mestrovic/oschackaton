angular.module('teglanje').controller('recipesCtrl', ['$scope', 'recipes', function ($scope, recipes) {
    $scope.Recipes = recipes;
  
}]);

