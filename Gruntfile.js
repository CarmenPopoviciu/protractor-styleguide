// Generated on 2014-12-08 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/unit/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/unit/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

  	grunt.loadNpmTasks('grunt-execute');
	
    // Configurable paths for the application
    // var appConfig = {
        // app: require('./bower.json').appPath || 'app',
        // dist: 'dist'
    // };

    // Define the configuration for all the tasks
    grunt.initConfig({

		// grunt-execute is used to start live server via a node script.
		// (live-server is not a grunt plugin)
		execute: {
			develop: {
                options: {
					// open the browser
					args: [1]
                },
				src: ['liveServer.js']
            },
            test: {
                options: {
					// do not open the browser
					args: [0]
                },
				src: ['liveServer.js']
            }
		},
		
		protractor: {
            options: {
                keepAlive: false,
                noColor: false
            },
            e2e: {
                options: {
                    configFile: 'protractor.conf.js'
                }
            }
        },
		
		// TODO add coverage
		// protractor_coverage: {
			// options: {
				// keepAlive: true,
				// noColor: false,
				// collectorPort: 3001,
				// coverageDir: 'coverage',
				// args: {
					// baseUrl: 'http://localhost:8080'
				// }
			// },
			// local: {
				// options: {
					// configFile: 'protractor.conf.js'
				// }
			// }
		// },
		
		// Run some tasks in parallel to speed up the build process
        concurrent: {
            protractor: [
                'execute:test',
				'protractor'
            ]
        }
		
  
    });

	grunt.registerTask('serve', [
		'execute:develop'
	]);
    
	grunt.registerTask('runProtractor', [
		'concurrent:protractor'
    ]);

	grunt.registerTask('default', [
        'execute:develop'
    ]);
};
