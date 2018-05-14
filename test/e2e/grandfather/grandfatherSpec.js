'use strict';

var GrandfatherOfAllKnowledge = require('./grandfatherPageObject');

describe("The grandfather of all knowledge module", function() {

    var grandfatherOfAllKnowledge = new GrandfatherOfAllKnowledge();

    beforeEach(function() {
        browser.get('/grandfather-of-all-knowledge/index.html');
    });

    it('should answer any question', function() {
        grandfatherOfAllKnowledge.askQuestion("What is the purpose of meaning?");
        expect(grandfatherOfAllKnowledge.getAnswer()).toEqual("Chocolate!");
    });

    it('should not be able to ask an empty question', function() {
        grandfatherOfAllKnowledge.askQuestion("    ");
        expect(grandfatherOfAllKnowledge.getAnswer()).toEqual("");
        expect(grandfatherOfAllKnowledge.button.isEnabled()).toBeFalsy();
    });

    it('should clear the answer when the questionfield gets focus', function() {
        grandfatherOfAllKnowledge.askQuestion("What is the last digit of Pi");
        expect(grandfatherOfAllKnowledge.getAnswer()).toEqual("Chocolate!");
		grandfatherOfAllKnowledge.question.sendKeys("?");
		expect(grandfatherOfAllKnowledge.getAnswer()).toEqual("");
    });
});
