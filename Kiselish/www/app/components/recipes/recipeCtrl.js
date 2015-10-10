angular.module('teglanje').controller('recipeCtrl', ['$scope', 'recipe', 'ingredients',  function ($scope, recipe, ingredients) {
    $scope.Recipe = recipe;
    $scope.Ingredients = ingredients;
}]);

