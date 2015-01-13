Protractor Testing Guidelines
============================

Some opinionated guidelines for those out there, looking for testing best practices with protractor

## Nota Bene
These guidelines were written having strictly AngularJS applications in mind....


## Table of Contents

1. [Testing](#testing)
  * [Unit Testing](#unit-testing)
  * [E2E Testing](#e2e-testing)
3. [Protractor](#protractor)
4. [Page Objects](#page-objects)
5. [Helper Classes](#helper-classes)

## Testing

When it comes to testing AngularJS applications, there are two main types of tests you want to cover: unit and e2e
tests (mind you the "AND" not the "OR" ;)). Both are equally important, so if you care at all about the sanity of your
application, and, why not admit it, yours too, then writing unit and e2e tests will hold an important place in your
process.

#### Unit Testing

Unit tests are your first line of defence against bugs and errors in your code. They ensure that the smallest parts
of your code, the units, work as intended, by testing them in complete isolation from the rest of the application. If you
think of your application as the process of building a car, unit testing would be taking each car part, like the wheels,
or the engine, separately, and checking whether they work as intended, independently from the other parts of the car. It
is important to remember the "in complete isolation" aspect of unit testing. Instantiating services, making API calls,
or even worse, instantiating the entire system (all very expensive operations), in order to test one single
unit, is unnecessary and not something that you want to have in your unit tests. The general rule of thumb is to mock
any external dependencies of the unit under test.

There are many more things to say about unit testing, but since the subject is outside the scope of this article, let's
leave to that, and oh well, one example, just for the peace of mind of it ;)

```javascript
  /* recommended */

  // add example here
```

#### E2E Testing

## Protractor

## Page Objects

## Helper Classes
