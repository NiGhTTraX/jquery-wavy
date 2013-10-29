module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>\n' +
								'(c) 2013, Andrei Picus\n' +
								'License: GPL*/\n'
			},

			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			},
		},

		jshint: {
			src: {
				src: [ "src/**/*.js" ],
			},
			grunt: {
				src: [ "Gruntfile.js"],
			},
			tests: {
				src: [ "tests/**/*.js" ],
			}
		},

		qunit: {
			all: {
				options: {
					urls: ['http://localhost:8000/tests/index.html']
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: '.'
				}
			}
		}
	});

	// Grunt plugins.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );

	// Tasks.
	grunt.registerTask('test', ['connect', 'qunit']);
	grunt.registerTask('default', ['jshint', 'test', 'uglify']);
};

