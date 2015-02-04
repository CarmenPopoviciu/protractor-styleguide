'use strict';

var GrandfatherOfAllKnowledge = require('./grandfatherPageObject');

describe("The grandfather of all knowledge module", function() {

    var grandfatherOfAllKnowledge = new GrandfatherOfAllKnowledge();

    beforeEach(function() {
        browser.get('/#/grandfather-of-all-knowledge');
    });

    it('should answer any question', function() {
        grandfatherOfAllKnowledge.askQuestion("What is the purpose of meaning?");
        expect(grandfatherOfAllKnowledge.getAnswer()).toEqual("Chocolate!");
    });

    it('should not answer empty questions', function() {
        grandfatherOfAllKnowledge.askQuestion("    ");
        expect(grandfatherOfAllKnowledge.getAnswer()).toEqual("");
        expect(grandfatherOfAllKnowledge.button.isEnabled()).toBeFalsy();
    });
});
