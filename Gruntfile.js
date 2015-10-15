// Generated on 2014-12-08 using generator-angular 0.10.0
'use strict';

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-protractor-coverage');
	grunt.loadNpmTasks('grunt-istanbul');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	var serveStatic = require('serve-static');
  
	// Define the configuration for all the tasks
	grunt.initConfig({
	
		connect: {
			develop: {
				options: {
					open:true,
					keepalive:true,
					port: 9005,
					hostname: 'localhost',
					directory: 'examples',
					middleware: function (connect) {
						return [
							connect().use('/', serveStatic('app')),
							connect().use('/lib/', serveStatic('bower_components')),
							connect().use('/', serveStatic('examples'))
						];
					}
				}
			},
			e2e: {
				options: {
					open:false,
					port: 9000,
					hostname: 'localhost',
					middleware: function (connect) {
						return [
							// only the js files are in the instumented folder
							connect().use('/js/', serveStatic('instrumented/app/js')),
							
							connect().use('/lib/', serveStatic('bower_components')),
							connect().use('/css/', serveStatic('app/css')),
							connect().use('/', serveStatic('examples'))
						];
					}
				}
			},
			results: {
				options: {
					open:true,
					keepalive:true,
					port: 9010,
					hostname: 'localhost',
					middleware: function (connect) {
						return [
							connect().use('/', serveStatic('coverage/lcov-report'))
						];
					}
				}
			}
		},
		
		instrument: {
			files: 'app/**/*.js',
			options: {
				lazy: true,
				basePath: "instrumented"
			}
		},
		
		protractor_coverage: {
			options: {
				keepAlive: true,
				noColor: false,    
				collectorPort: 5670,
				debug: false,
				coverageDir: 'coverage',
				args: {
					baseUrl: 'http://localhost:9000',
					specs: ['test/e2e/**/*.spec.js']
				},
				configFile: 'protractor.conf.js'
			},
			local: {
				// options: {
					// configFile: 'protractor.conf.js'
				// }
			}		
		},
		
		makeReport: {
			src: 'coverage/*.json',
			options: {
				type: 'lcov',
				dir: 'coverage',
				print: 'detail'
			}
		},
		
		clean: {
			e2e: [
				'instrumented',
				'coverage'
			]
		}
		
	});


	grunt.registerTask('e2e', [
		'clean:e2e',
        'instrument',
		'connect:e2e',
		'protractor_coverage:local',
		'makeReport'
		// 'connect:results'   uncomment if you want to show the coverage results after the e2e test
    ]);
   
	grunt.registerTask('serve', ['connect:develop']);
   
	grunt.registerTask('coverage', ['connect:results']);
   
   
};
