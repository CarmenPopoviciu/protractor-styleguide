'use strict';

var AfterMePageObject = require("./AfterMePageObject");

// TODO this is still not very pretty
describe("The repeat after me module", function() {

    var afterMePageObject = new AfterMePageObject();

    beforeEach(function() {
        browser.get('/#/repeat-after-me');
    });

    it("should highlight the user entered sequence in green if matching the original sequence", function() {
        afterMePageObject.getSequenceDigitByIndex(0).then(function(value) {
            afterMePageObject.clickButtonWithIndex(value-1);
        });
        afterMePageObject.getSequenceDigitByIndex(1).then(function(value) {
            afterMePageObject.clickButtonWithIndex(value-1);
        });
        afterMePageObject.getSequenceDigitByIndex(2).then(function(value) {
            afterMePageObject.clickButtonWithIndex(value-1);
        });

        expect(afterMePageObject.userSequenceElement.getAttribute('class')).toContain('green');
    });

    it("should highlight the user entered sequence in red if it doesn't match the original sequence", function() {
        var buttonsCount = afterMePageObject.getButtonsCount();
        var btnIndex;

        afterMePageObject.getSequenceDigitByIndex(0).then(function(value) {
            btnIndex = (value===buttonsCount) ? (value-2) : value;
            afterMePageObject.clickButtonWithIndex(btnIndex);
        });
        expect(afterMePageObject.userSequenceElement.getAttribute('class')).toContain('red');

        afterMePageObject.getSequenceDigitByIndex(0).then(function(value) {
            btnIndex = (value===buttonsCount) ? (value-2) : value;
            afterMePageObject.clickButtonWithIndex(btnIndex);
        });
        expect(afterMePageObject.userSequenceElement.getAttribute('class')).toContain('red');

        afterMePageObject.getSequenceDigitByIndex(0).then(function(value) {
            btnIndex = (value===buttonsCount) ? (value-2) : value;
            afterMePageObject.clickButtonWithIndex(btnIndex);
        });
        expect(afterMePageObject.userSequenceElement.getAttribute('class')).toContain('red');
    });
});
