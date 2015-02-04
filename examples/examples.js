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
        'pgGrandfatherOfAllKnowledge'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/grandfather-of-all-knowledge', {
                templateUrl: 'grandfather-of-all-knowledge/grandfather.html',
                controller: 'GrandfatherCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

