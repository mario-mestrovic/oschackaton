angular.module('teglanje').factory('parseServices', [function () {

    var challenges = Parse.Object.extend('challenge');
    var news = Parse.Object.extend('news');
    var orders = Parse.Object.extend('order');
    var challengeusers = Parse.Object.extend('challengeusers');
    var users = Parse.Object.extend('User');
    var events = Parse.Object.extend('event');
    var orderitems = Parse.Object.extend('orderitem');
    var recipes = Parse.Object.extend('recipe');
    var recipeingredients = Parse.Object.extend('recipeingredient');

    return
    {
        Challenges : challenges
        //, 
        //News : news, 
        //Orders : orders, 
        //ChallengeUsers : challengeusers, 
        //Users : users, 
        //Events :events, 
        //OrderItems : orderitems, 
        //Recipes : recipes, 
        //RecipeIngredients : recipeingredients
        };
}]);