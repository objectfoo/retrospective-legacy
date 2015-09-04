module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		watch: {
			style: {
				files: 'src/source.css',
				tasks: ['myth']
			}
		},
		myth: {
				files: {
					'dist/style.css': 'src/source.css'
				}
		}
	});

	grunt.loadNpmTasks('grunt-myth');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
};
