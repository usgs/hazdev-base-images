'use strict';

module.exports = function (grunt) {

  var gruntConfig = require('./gruntconfig');

  gruntConfig.tasks.forEach(grunt.loadNpmTasks);
  grunt.initConfig(gruntConfig);

  grunt.event.on('watch', function (action, filepath) {
    // Only lint the file that actually changed
    grunt.config(['eslint', 'scripts'], filepath);
  });

  grunt.registerTask('test', [
    'build',
    'mocha_phantomjs'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'eslint:scripts',
    'eslint:tests',
    'browserify',
    'postcss:build',
    'copy:build',
    'copy:test',
    'copy:test_depends'
  ]);

  grunt.registerTask('builddist', [
    'build',
    'clean:dist',
    'copy:dist',
    'postcss:dist',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'build',
    'mocha_phantomjs',
    'watch'
  ]);

};
