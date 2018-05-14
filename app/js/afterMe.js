(function() {
    'use strict';

    angular.module("pgRepeatAfterMe", [])
        .controller("AfterMeCtrl", AfterMeCtrl);

    function AfterMeCtrl($scope) {
        var MAX_ALLOWED_DIGIT = 9;
        var SEQUENCE_LENGTH = 3;

        $scope.sequence = generateSequence(SEQUENCE_LENGTH);
        $scope.userSequence = "";

        $scope.updateUserSequence = updateUserSequence;
        $scope.disableButton = disableButton;
        $scope.resetSequence = resetSequence;
        $scope.isAMatch = isAMatch;

        function generateSequence(length) {
            var sequence = "";
            var number;

            for(var i=0; i<length; i++) {
                number = Math.floor((Math.random() * MAX_ALLOWED_DIGIT) + 1);
                sequence = sequence.concat(number);
            }

            return sequence;
        }

        function updateUserSequence(char) {
            $scope.userSequence = $scope.userSequence.concat(char);
        }

        function disableButton() {
            return ($scope.userSequence.length === SEQUENCE_LENGTH);
        }

        function resetSequence() {
            $scope.sequence = generateSequence(SEQUENCE_LENGTH);
            $scope.userSequence = "";
        }

        function isAMatch() {
            return ($scope.sequence === $scope.userSequence);
        }
    }
})();


