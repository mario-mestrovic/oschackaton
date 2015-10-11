/// <reference path="~/www/lib/ionic/js/ionic.bundle.js" />
/// <reference path="~/www/lib/ngCordova/dist/ng-cordova.js" />
/// <reference path="~/www/lib/parse/parse-1.6.0.js" />
/// <reference path="~/www/app/lib.js" />

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('teglanje', ['ionic', 'ngCordova'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required 
            StatusBar.styleLightContent();
        }
    });
})
    .run(function ($rootScope, $state, $ionicHistory, NavigationService) {

        var firstRun = true;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            //if (!toState.name || toState.name === '' || toState.name.startsWith('home')) {
            //    if (UserService.isLoggedIn()) {
            //        //great go to home
            //    }
            //    else {
            //        event.preventDefault();
            //        NavigationService.navigateTo('phone-register', null, { historyRoot: true });
            //    }
            //}
            //else if (toState.name === 'phone-register') {
            //    if (UserService.isLoggedIn()) {
            //        event.preventDefault();
            //        NavigationService.navigateTo('home', null, { historyRoot: true });
            //    }
            //    else {

            //    }
            //}

        });
    })
.config(function ($stateProvider, $ionicConfigProvider, $urlRouterProvider, parseConfig) {

    $ionicConfigProvider.tabs.position('top');

    Parse.initialize(parseConfig.applicationId, parseConfig.javaScriptKey, parseConfig.masterKey);

    window.fbAsyncInit = function () {
        Parse.FacebookUtils.init({ // this line replaces FB.init({
            appId: '443681552494797', // Facebook App ID
            status: true,  // check Facebook Login status
            cookie: true,  // enable cookies to allow Parse to access the session
            xfbml: true,  // initialize Facebook social plugins on the page
            version: 'v2.5' // point to the latest Facebook Graph API version
        });

        // Run code after the Facebook SDK is loaded.
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    // setup an abstract state for the tabs directive
    $stateProvider


    .state('home', {
        url: '/home',
        abstract: true,
        templateUrl: 'app/components/home/home.html'
    })
    .state('login', {
        url: '/challenges',
        templateUrl: 'app/components/login/login.html',
        controller: 'loginCtrl'
    })
    .state('home.challenges', {
        url: '/challenges',
        resolve: {
            challenges: function (ProgressService, parseService) {
                var promise = parseService.getChallenges()
                      .catch(function (error) {
                          return null;
                      });
                return ProgressService.withProgress(promise);
            }
        },
        views: {
            'home-challenges': {
                templateUrl: 'app/components/challenge/challenges.html',
                controller: 'challengesCtrl'
            }
        }
    })

    .state('home.challenge', {
        url: '/challenges/:challengeId',
        resolve: {
            challenge: function (ProgressService, parseService, $stateParams) {
                var promise = parseService.getChallenge($stateParams.challengeId)
                   .catch(function (error) {
                       return null;
                   });
                return ProgressService.withProgress(promise);
            },
            participants: function (ProgressService, parseService, $stateParams) {
                var promise = parseService.getChallengeUsers($stateParams.challengeId)
                      .catch(function (error) {
                          return null;
                      });
                return ProgressService.withProgress(promise);
            }
        },
        views: {
            'home-challenges': {
                templateUrl: 'app/components/challenge/challenge.html',
                controller: 'challengeCtrl'
            }
        }
    })

    .state('home.market', {
        url: '/produce',
        resolve: {
            produces: function (ProgressService, parseService) {
                var promise = parseService.getProduces()
                   .catch(function (error) {
                       return null;
                   });
                return ProgressService.withProgress(promise);
            }
        },
        views: {
            'home-market': {
                templateUrl: 'app/components/market/produce.html',
                controller: 'produceCtrl'
            }
        }
    })

    .state('home.market-cart', {
        url: '/cart',
        views: {
            'home-market': {
                templateUrl: 'app/components/market/cart.html',
                controller: 'cartCtrl'
            }
        }
    })

    .state('home.market-previous-orders', {
        url: '/previous-orders',
        resolve: {
            previousOrders: function (ProgressService, parseService) {
                var promise = parseService.getPreviousOrders()
                   .catch(function (error) {
                       return null;
                   });
                return ProgressService.withProgress(promise);
            }
        },
        views: {
            'home-market': {
                templateUrl: 'app/components/market/previous-orders.html',
                controller: 'previousOrdersCtrl'
            }
        }
    })

    .state('home.recipes', {
        url: '/recipes',
        resolve: {
            recipes: function (ProgressService, parseService) {
                var promise = parseService.getRecipes()
                     .catch(function (error) {
                         return null;
                     });
                return ProgressService.withProgress(promise);
            }
        },
        views: {
            'home-recipes': {
                templateUrl: 'app/components/recipes/recipes.html',
                controller: 'recipesCtrl'
            }
        }
    })

    .state('home.recipe', {
        url: '/recipes/:recipeId',
        resolve: {
            recipe: function (ProgressService, parseService, $stateParams) {
                return ProgressService.withProgress(parseService.getRecipe($stateParams.recipeId));
            },
            ingredients: function (ProgressService, parseService, $stateParams) {
                var promise = parseService.getRecipeIngredients($stateParams.recipeId)
                     .catch(function (error) {
                         return null;
                     });
                return ProgressService.withProgress(promise);
            }
        },
        views: {
            'home-recipes': {
                templateUrl: 'app/components/recipes/recipe.html',
                controller: 'recipeCtrl'
            }
        }
    })
    .state('home.news', {
        url: '/news',
        resolve: {
            news: function (ProgressService, parseService) {
                var promise = parseService.getNews()
                   .catch(function (error) {
                       return null;
                   });
                return ProgressService.withProgress(promise);
            }
        },
        views: {
            'home-news': {
                templateUrl: 'app/components/news/news.html',
                controller: 'newsCtrl'
            }
        }
    })

    .state('home.article', {
        url: '/article/:articleId',
        resolve: {
            article: function (ProgressService, parseService, $stateParams) {
                var promise = parseService.getArticle($stateParams.articleId)
                    .catch(function (error) {
                        return null;
                    });
                return ProgressService.withProgress(promise);
            }
        },
        views: {
            'home-news': {
                templateUrl: 'app/components/news/article.html',
                controller: 'articleCtrl'
            }
        }
    })

    .state('home.articleWinner', {
        url: '/articleWinner/:articleId',
        resolve: {
            article: function (ProgressService, parseService, $stateParams) {
                var promise = parseService.getArticle($stateParams.articleId)
                        .catch(function (error) {
                            return null;
                        });

                return ProgressService.withProgress(promise);
            }
        },
        views: {
            'home-news': {
                templateUrl: 'app/components/news/articleWinner.html',
                controller: 'articleWinnerCtrl'
            }
        }
    })


    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home/recipes');

});

