'use strict';


var fs = require('fs');


var config,
    packageJson;

packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));


config = {
  build: 'build',
  dist: 'dist',
  etc: 'etc',
  example: 'example',
  lib: 'lib',
  packageJson: packageJson,
  src: 'src',
  test: 'test',

  cssPath: [
    'src/htdocs/css',
    'node_modules/hazdev-webutils/src'
  ],

  jsPath: {
    'src/htdocs/js': '*/*.js',
    'node_modules/hazdev-webutils/src': '**/*.js'
  }

};


module.exports = config;
