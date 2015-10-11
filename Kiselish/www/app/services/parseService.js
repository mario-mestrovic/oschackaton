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
    var ObjOrder = Parse.Object.extend('order');


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

    var _self = this;

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
        challengeUser.set('user', Parse.User.current());
        challengeUser.set('challenge', challenge);
        challengeUser.save().then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;


    };

    this.checkout = function (items) {
        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'checkout' });
        }

        var deferred = $q.defer();

        var user = Parse.User.current();
        var order = new ObjOrder();
        order.set('user', user);
        order.set('items', items);
        order.save()
            .then(_self.getOrders)
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    this.getOrders = function () {
        function onSuccess(response) {
            return response;
        }
        function onError(error) {
            return onApiServiceError(error, { methodName: 'getOrders' });
        }

        var deferred = $q.defer();

        var user = Parse.User.current();

        var query = new Parse.Query(ObjOrder);
        query.include('items');
        query.equalTo("user", user);
        query.find()
            .then(function (orders) {

                var pc = Parse.Promise.as();

                orders.forEach(function (order) {
                    var items = order.get('items');

                    items.forEach(function (item) {
                        if (item.className == 'ingredientprice') {

                            var ingridientprice = new ObjProduce();
                            ingridientprice.id = item.id;

                            pc = pc.then(function () {
                                return ingridientprice.fetch()
                                    .then(function () {
                                        order.items = order.items || [];
                                        order.items.push(ingridientprice);
                                    });
                            });
                        }
                        else if(item.className == 'recipe') {
                            var recipe = new ObjRecipe();
                            recipe.id = item.id;

                            pc = pc.then(function () {
                                return recipe.fetch()
                                    .then(function () {
                                        order.items = order.items || [];
                                        order.items.push(recipe);
                                    });
                            }); 
                        }
                    });
                });

                return pc.then(function () {
                    return orders;
                });
            })
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };


});