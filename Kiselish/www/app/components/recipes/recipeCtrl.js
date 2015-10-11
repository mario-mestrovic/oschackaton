angular.module('teglanje').controller('recipeCtrl', ['$scope', 'cartService', 'recipe', 'ingredients', function ($scope, cartService, recipe, ingredients) {
    $scope.Recipe = recipe;
    $scope.Ingredients = ingredients;

    $scope.addToCart = function (recipe, ingredients) {
        recipe.ingredients = ingredients; //hack
        cartService.addToCart(recipe);
    };
}]);

