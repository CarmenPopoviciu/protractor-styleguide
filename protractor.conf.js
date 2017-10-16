/**
 * Very basic protractor configuration
 *
 */

exports.config = {
    specs: [
        'examples/*/test/*Spec.js'
    ],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:9000',
    rootElement: 'body',
    framework: 'jasmine'
};
