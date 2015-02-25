'use strict';

/**
 * Main module of the application.
 */
angular
    .module('protractorGuidelinesApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',

        // all custom modules
        'pgGrandfatherOfAllKnowledge',
        'pgRepeatAfterMe'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/grandfather-of-all-knowledge', {
                templateUrl: 'grandfather-of-all-knowledge/grandfather.html',
                controller: 'GrandfatherCtrl'
            })
            .when('/repeat-after-me', {
                templateUrl: 'repeat-after-me/afterMe.html',
                controller: 'AfterMeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

