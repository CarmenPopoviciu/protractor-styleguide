'use strict';

var AfterMePageObject = function() {
    var container = element(by.css("div"));

    this.sequenceElement = container.element(by.binding("sequence"));
    this.userSequenceElement = container.element(by.binding("userSequence"));
    this.buttons = container.all(by.css('button[ng-disabled="disableButton()"]'));

    this.getSequence = function() {
        return this.sequenceElement.getText();
    };

    this.getUserSequence = function() {
        return this.userSequenceElement.getText();
    };

    this.getSequenceDigitByIndex = function(index) {
        var digit;
        var d = protractor.promise.defer();
        this.sequenceElement.getText().then(function(value) {
            digit = parseInt(value.charAt(index));
            d.fulfill(digit);
        });
        return d.promise;
    };

    this.clickButtonWithIndex = function(index) {
        this.buttons.get(index).click();
    };
};

module.exports = AfterMePageObject;