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
    baseUrl: 'http://127.0.0.1:8080',
    rootElement: 'body',
    framework: 'jasmine'
};
