/// <reference path="~/www/lib/ionic/js/ionic.bundle.js" />
/// <reference path="~/www/lib/parse/parse-1.6.0.js" />


angular.module('kiselish')

.factory('ProgressService', function ($ionicLoading) {

    var show = function (template) {
        if (template)
            $ionicLoading.show({ template: optionalText });
        else
            $ionicLoading.show();
    };

    var hide = function () {
        $ionicLoading.hide();
    };

    var progressCounter = 0;

    var wrap = function (promise, start, end) {
        //shows progress and hides it after promise resolves

        function progressStart() {

            if (start) {
                start();
            }
            else {
                show();
                progressCounter++;
            }
        };
        function progressEnd() {
            if (end) {
                end();
            }
            else {
                progressCounter--;
                if (progressCounter < 1) {
                    progressCounter = 0;
                    hide();
                }
            }
        };

        if (promise.finally) {
            progressStart();
            promise.finally(progressEnd);
        }
        else if (promise.always) {
            progressStart();
            promise.always(progressEnd);
        }

        return promise;
    };

    return {
        show: show,
        hide: hide,
        withProgress: wrap
    };

});
