angular.module('teglanje')

.service('parseService', function ($q) {

    var challengeObj = Parse.Object.extend('challenge');
    var news = Parse.Object.extend('news');
    var orders = Parse.Object.extend('order');
    var challengeusers = Parse.Object.extend('challengeusers');
    var users = Parse.Object.extend('User');
    var events = Parse.Object.extend('event');
    var orderitems = Parse.Object.extend('orderitem');
    var recipes = Parse.Object.extend('recipe');
    var recipeingredients = Parse.Object.extend('recipeingredient');


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

        var challengesQuery = new Parse.Query(challengeObj);
        challengesQuery.equalTo("isActive", true);
        challengesQuery.find()
            .then(onSuccess, onError)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    }
 
});