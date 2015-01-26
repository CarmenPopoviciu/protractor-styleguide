Protractor Testing Guidelines
============================

Some opinionated guidelines for those out there, looking for testing best practices with protractor

## Nota Bene
These guidelines were written having strictly AngularJS applications in mind....


## Table of Contents

1. [Testing](#testing)
  * [Unit Testing](#unit-testing)
  * [E2E Testing](#e2e-testing)
2. [Protractor](#protractor)
3. [Page Objects](#page-objects)
4. [Helper Classes](#helper-classes)
5. [Useful Links](#useful-links)


## Testing

When it comes to testing AngularJS applications, there are two main types of tests you want to cover: unit and e2e
tests (mind you the "AND" not the "OR" ;)). Both are equally important, so if you care at all about the sanity of your
application, and, why not admit it, yours too, then writing unit and e2e tests will hold an important place in your
process.

#### Unit Testing

Unit tests are your first line of defence against bugs and errors in your code. They ensure that the smallest parts
of your code, the units, work as intended, by testing them in complete isolation from the rest of the application. If you
think of your application as the process of building a car, unit testing would be taking each car part, like the wheels,
or the engine, separately, and checking whether they work as intended, independently from the other parts of the car.

It is important to remember the "in complete isolation" aspect of unit testing. Instantiating services, making API calls,
or even worse, instantiating the entire system (all very expensive operations), in order to test just one single
unit, is unnecessary and not something that you want to have in your unit tests. The general rule of thumb is to mock
any external dependencies of the unit under test.

There are many more things to say about unit testing, and there are even some [links](#useful-links) to help you out
with that, but since the subject is outside the scope of this article, let's leave it to that, and oh well, one example,
just for the peace of mind of it ;)

```javascript
  /* recommended */

  // add example here
```

#### E2E Testing

E2E tests come into play once all units are fully tested and you want to start looking into how these components play
together. In other words, you will want to make sure that once your end user starts interacting with your application
and clicks his/her way through it, it will behave as expected and not }:) output :o all sort o/ of funny :P smileys
everywhere ;).

Coming back to our previous car example, e2e testing would mean checking that all components of the car integrate well
with each other and have the expected behavior as an overall, so for instance that the break lights turn on when the
driver steps on the breaks or that the wheels start turning when the driver steps on the acceleration pedal, and so on.

Again, it is very important to keep in mind, that just like with unit tests, e2e tests are black-box tests and only
care about the functionality of the application from an end user point of view. Whether or not the services around the
application work properly, or that responses from the server are correct, and so on, is outside the scope of e2e testing
and should be handled as separate tests, which we will not cover in this article. Rule of thumb is again to mock all
these dependencies.

//TODO add mention here that ppl could also let all the calls go through
// make clear that ppl understand that the point of e2e testing is not to test your services and api calls but rather
//the user interaction of your app
// run tests against mocks

## Protractor

If you've been in the Angular world for long enough, you'll probably remember about the [Angular Scenario Runner]
(https://code.angularjs.org/1.2.16/docs/guide/e2e-testing). The Scenario Runner was originally shipped with Angular as a
tool to help developers e2e test their application. However, due to some design and maintenance issues, the team decided
to not continue with its development and provide a better solution on the long term. Currently, the Angular Scenario
Runner is deprecated and in maintenance mode, so in case you are using it in your application, you might want to
reconsider.

The "new" tool for e2e testing your AngularJS application is Protractor. Protractor is an e2e test framework build on top
of WebDriverJS, which adds some Angular-specific functionality.

// TODO what more do we want to say here?

**One word of advice!** New versions of Protractor can sometimes come with breaking changes, which might, well, break
your tests. Make sure to always read the changelog before updating to a newer or the latest version!

### One config file to rule them all

  - Create one protractor.conf.js file. You can create spin-offs using grunt (or an other task runner).

Any protractor test suite starts out with a protractor.conf.js file, which, as the name suggests, configuration code for
protractor written out in javascript. When you want to test different test tasks (targets), its easy to create copies of
the conf file. You shouldn't do that. Just because a file contains config, doesn't mean that it isn't code and thus
you should treat it as if it is production code. Code duplication is not acceptable.

## Page Objects

As mentioned earlier, e2e tests cover the interaction scenarios between the end user and your application. This works by
having the test code simulate a series of user actions against certain UI parts of your application and then making some
assertions regarding what the expected result of those actions should be.

So let's assume we have a very simple application that can answer any questions a user might have. Let's call it the
"Grandfather of All Knowledge" app. The idea of the app is pretty straightforward: the user enters a question in an input
field, presses a button and gets the answer to it. Easy! ... and clever if you get the right answer ;)

The HTML markup for the application would look something like this:

```html
  <!-- grandfather.html -->

  <body ng-app="GrandfatherOfAllKnowledgeApp">
    <div class="question">
      <input class="question__field" ng-model="question.text"
             placeholder="What would you like to ask Grandfather of all knowledge?">
      <button class="question__button" ng-click="answerQuestion()"
              ng-disabled="!question.text">?</button>
    </div>
    <div class="answer">{{answer}}</div>
  </body>
  ```

The e2e tests in this case should cover exactly the interaction we described earlier: user enters question, presses
button and gets an answer. They would look something like this:

```javascript
  /* grandfatherSpec.js */

  describe("The grandfather of all knowledge module", function() {

      beforeEach(function() {
          browser.get('/#/grandfather-of-all-knowledge');
      });

      it('should answer any question', function() {
          var question = element(by.model('question.text'));
          var answer = element(by.binding('answer'));
          var button = element(by.className('question__button'));

          question.sendKeys("What is the purpose of meaning?");
          button.click();
          expect(answer.getText()).toEqual("Chocolate!");
      });

      it('should not answer empty questions', function() {
          var question = element(by.model('question.text'));
          var answer = element(by.binding('answer'));
          var button = element(by.className('question__button'));

          question.sendKeys("    ");
          expect(button.isEnabled()).toBeFalsy();
      });
  });
```

Now, the fact that we are declaring the question/answer/button elements in each spec, is of course pretty inconvenient
and wasteful. Instead of having this duplicate code throughout all our tests, let's be a little smarter than that and
refactor them to the following:

```javascript
  /* grandfatherSpec.js */

  describe("The grandfather of all knowledge module", function() {

      var question = element(by.model('question.text'));
      var answer = element(by.binding('answer'));
      var button = element(by.className('question__button'));

      beforeEach(function() {
          browser.get('/#/grandfather-of-all-knowledge');
      });

      it('should answer any question', function() {
          question.sendKeys("What is the purpose of meaning?");
          button.click();
          expect(answer.getText()).toEqual("Chocolate!");
      });

      it('should not answer empty questions', function() {
          question.sendKeys("    ");
          expect(button.isEnabled()).toBeFalsy();
      });
  });
```

This is already better, but if you look closer, you'll come to realise that our tests are dealing with several different
concerns at the same time: keeping track of the page under test, selecting elements from that page,
defining the interaction with these elements, making the assertions and so on. Furthermore, imagine that the markup of
the tested page changes, so for instance the class of our button would change from "question__button" to just simply
"button". This would mean that we would have to revisit all the places in our tests where we declared the button and make
sure its selector uses the correct class name. For large code bases, but not even, this is simply not maintainable and
for sure not something that you want to deal with.

This is precisely the point where Page Objects will come to the rescue. Page Object is a design pattern that is largely
used in test automation for enhancing test maintenance and reducing code duplication [(4)](#page-objects-1). Think of a
Page Objects as the API of the UI your tests interact with. Page Objects are responsible of abstracting away the
implementation details of your UI from your tests, and simply provide an interface which should allow a software client
do anything and see anything the user can [(6)](#page-objects-1).

Coming back to our Grandfather of all Knowledge application, let's see how a Page Object would look:

```javascript
  /* grandfatherPageObject.js */

  var GrandfatherOfAllKnowledge = function() {
      this.question = element(by.model('question.text'));
      this.answer = element(by.binding('answer'));
      this.button = element(by.className('question__button'));

      this.setQuestion = function(text) {
          this.question.sendKeys(text);
      };

      this.askQuestion = function() {
          this.button.click();
      };

      this.getAnswer = function() {
          return this.answer.getText();
      };
  };
```

```javascript
  /* grandfatherSpec.js */

  var GrandfatherOfAllKnowledge = require('./grandfatherPageObject');

  describe("The grandfather of all knowledge module", function() {

      var grandfatherOfAllKnowledge = new GrandfatherOfAllKnowledge();

      beforeEach(function() {
          browser.get('/#/grandfather-of-all-knowledge');
      });

      it('should answer any question', function() {
          grandfatherOfAllKnowledge.setQuestion("What is the purpose of meaning?");
          grandfatherOfAllKnowledge.askQuestion();
          expect(grandfatherOfAllKnowledge.getAnswer()).toEqual("Chocolate!");
      });

      it('should not answer empty questions', function() {
          grandfatherOfAllKnowledge.setQuestion("    ");
          expect(grandfatherOfAllKnowledge.button.isEnabled()).toBeFalsy();
      });
  });
```



## Helper Classes

## Useful Links
###### Unit Testing
  (1) [Karma](http://karma-runner.github.io/)
  (2) [Karma design docs](https://github.com/karma-runner/karma/blob/master/thesis.pdf)

###### E2E Testing
  (3) [Protractor](http://angular.github.io/protractor)

###### Page Objects
  (4) [Selenium](http://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern)
  (5) [Google Selenium pages](https://code.google.com/p/selenium/wiki/PageObjects)
  (6) [Martin Fowler](http://martinfowler.com/bliki/PageObject.html)
