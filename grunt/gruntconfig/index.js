'use strict';


var gruntConfig = {
  config: require('./config'),

  browserify: require('./browserify'),
  clean: require('./clean'),
  copy: require('./copy'),
  eslint: require('./eslint'),
  mocha_phantomjs: require('./mocha_phantomjs'),
  postcss: require('./postcss'),
  uglify: require('./uglify'),
  watch: require('./watch'),

  tasks: [
    'grunt-browserify',
    'grunt-contrib-clean',
    'grunt-contrib-copy',
    'grunt-contrib-uglify',
    'grunt-contrib-watch',
    'grunt-mocha-phantomjs',
    'grunt-postcss',
    'gruntify-eslint'
  ]
};


module.exports = gruntConfig;
