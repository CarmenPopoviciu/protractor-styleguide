'use strict';

var GrandfatherOfAllKnowledge = function() {
    this.question = element(by.model('question.text'));
    this.answer = element(by.binding('answer'));
    this.button = element(by.className('question__button'));

    this.askQuestion = function(question) {
        this.question.sendKeys(question);
        this.button.click();
    };

    this.getAnswer = function() {
        return this.answer.getText();
    };
};

// figure this one out
module.exports = GrandfatherOfAllKnowledge; //= exports??;
