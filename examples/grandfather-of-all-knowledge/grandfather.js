'use strict';

/**
 *
 */
angular.module('pgGrandfatherOfAllKnowledge', [])
    .controller("GrandfatherCtrl", GrandfatherCtrl);

function GrandfatherCtrl($scope) {
    $scope.question = {};
    $scope.answer = '';

    $scope.answerQuestion = function() {
        $scope.answer = "Chocolate!";
    }
}
