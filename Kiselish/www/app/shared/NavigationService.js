/// <reference path="~/www/lib/ionic/js/ionic.bundle.js" />
/// <reference path="~/www/lib/parse/parse-1.6.0.js" />


angular.module('kiselish')

.service('NavigationService', function ($state, $ionicHistory) {

    this.navigateTo = function (stateName, stateParams, nextViewOptions) {

        if (nextViewOptions) {
            //$ionicHistory.nextViewOptions(nextViewOptions);
        }

        if (stateParams)
            $state.go(stateName, stateParams);
        else
            $state.go(stateName);
    };
    this.clearHistory = function () {
        $ionicHistory.clearHistory();
    };

    this.goBack = function (number) {

        number = number || 1;

        for (var i = 0; i < number; i++) {
            $ionicHistory.goBack();
        }
    };

    this.goBackMany = function (depth) {

        // get the right history stack based on the current view
        var historyId = $ionicHistory.currentHistoryId();
        var history = $ionicHistory.viewHistory().histories[historyId];
        // set the view 'depth' back in the stack as the back view
        var targetViewIndex = history.stack.length - 1 - depth;
        $ionicHistory.backView(history.stack[targetViewIndex]);
        // navigate to it
        $ionicHistory.goBack();
    };

    this.returnToState = function (stateName) {

        var historyId = $ionicHistory.currentHistoryId();
        var history = $ionicHistory.viewHistory().histories[historyId];
        for (var i = history.stack.length - 1; i >= 0; i--) {
            if (history.stack[i].stateName == stateName) {
                $ionicHistory.backView(history.stack[i]);
                $ionicHistory.goBack();
            }
        }
    };

});

