angular.module('teglanje')

.service('parseService', function ($q) {

    var ObjChallenge = Parse.Object.extend('challenge');
    var ObjNews = Parse.Object.extend('news');
    var ObjOrder = Parse.Object.extend('order');
    var ObjChallengeusers = Parse.Object.extend('challengeusers');
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

});