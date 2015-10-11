angular.module('teglanje')

.service('parseService', function ($q) {

    var ObjChallenge = Parse.Object.extend('challenge');
    var ObjNews = Parse.Object.extend('news');
    var ObjOrder = Parse.Object.extend('order');
    var ObjChallengeusers = Parse.Object.extend('challengeuser');
    var ObjUser = Parse.Object.extend('User');
    var ObjEvent = Parse.Object.extend('event');
    var ObjOrderitem = Parse.Object.extend('orderitem');
    var ObjRecipe = Parse.Object.extend('recipe');
    var ObjProduce = Parse.Object.extend('ingredientprice');
    var ObjRecipeingredient = Parse.Object.extend('recipeingredient');


    function logError(error, options) {

        options = options || {};
        options.methodName = (options.methodName && options.methodName !== '') || 'apiCall';

        var message = options.methodName + ' failed: ' + JSON.stringify(error);

        //options.alert = true;
        //options.log = true;

        if (options.log) {
            console.log(message);
        }
        if (options.alert) {
            alert(message);
        }
    }
    function onApiServiceError(error, options) {
        if (!error) {
            return error;
        }

        //if (error.code === 209) {
        //    error.sessionError = true;
        //    Parse.User.logOut();
        //}

        logError(error, options);
        return error;
    }


    this.getChallenges = function () {

        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getChallenges' });
        }

        var deferred = $q.defer();

        var challengesQuery = new Parse.Query(ObjChallenge);
        challengesQuery.equalTo("isActive", true);
        challengesQuery.find()
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    this.getProduces = function () {

        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getProduces' });
        }

        var deferred = $q.defer();

        var challengesQuery = new Parse.Query(ObjProduce);
        challengesQuery.include("ingredient");
        challengesQuery.find()
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    this.getRecipes = function () {

        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getRecipes' });
        }

        var deferred = $q.defer();

        var recipesQuery = new Parse.Query(ObjRecipe);

        recipesQuery.find()
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    this.getRecipeIngredients = function (recipeId) {
        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getRecipeIngredients' });
        }

        var deferred = $q.defer();

        var recipeIngredientsQuery = new Parse.Query(ObjRecipeingredient);
        var recipe = new ObjRecipe();
        recipe.id = recipeId;
        recipeIngredientsQuery.equalTo("recipe", recipe);
        recipeIngredientsQuery.include("ingredient");
        recipeIngredientsQuery.find()
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    this.getPreviosOrders = function () {

        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getPreviosOrders' });
        }

        var deferred = $q.defer();

        deferred.resolve([]);

        return deferred.promise;
    }

    this.getNews = function () {

        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getNews' });
        }

        var deferred = $q.defer();

        var challengesQuery = new Parse.Query(ObjNews);
        challengesQuery.include("winner");
        challengesQuery.find()
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    this.getArticle = function (articleId) {

        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getNews' });
        }

        var deferred = $q.defer();

        var challengesQuery = new Parse.Query(ObjNews);
        challengesQuery.equalTo("objectId", articleId);
        challengesQuery.first()
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    this.getChallenge = function (challengeId) {

        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getChallenge' });
        }

        var deferred = $q.defer();

        var challengeQuery = new Parse.Query(ObjChallenge);
        challengeQuery.equalTo("objectId", challengeId);
        challengeQuery.first()
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    this.getRecipe = function (recipeId) {

        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getRecipe' });
        }

        var deferred = $q.defer();

        var recipeQuery = new Parse.Query(ObjRecipe);
        recipeQuery.equalTo("objectId", recipeId);
        recipeQuery.first()
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    this.getChallengeUsers = function (challengeId) {
        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getChallengeUsers' });
        }

        var deferred = $q.defer();

        var challengeUsersQuery = new Parse.Query(ObjChallengeusers);
        var challenge = new ObjChallenge();
        challenge.id = challengeId;
        challengeUsersQuery.equalTo("challenge", challenge);
        challengeUsersQuery.include("user");
        challengeUsersQuery.find()
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    this.IsLogedIn = function () {
        return !!Parse.User.current();
    };

    this.applyToChallenge = function (challengeId) {
        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'applyToChallenge' });
        }

        var deferred = $q.defer();
        var user = Parse.User.current();
        var challengeUser = new ObjChallengeusers();
        var challenge = new ObjChallenge();
        challenge.id = challengeId;
        challengeUser.user = user;
        challengeUser.challenge = challenge;
        challengeUser.save().then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;


    };

});