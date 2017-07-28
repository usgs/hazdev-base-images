'use strict';

var config = require('./config'),
    fs = require('fs'),
    packageJson;

// read package.json
packageJson = JSON.parse(fs.readFileSync('package.json'));


var copy = {

  build: {
    expand: true,
    cwd: config.src,
    dest: config.build + '/' + config.src,
    src: [
      '**/*',
      '!**/*.js',
      '!**/*.scss',
      '!**/*.orig'
    ],
    filter: 'isFile',
    options: {
      mode: true,
      noProcess: ['**/*.{gif,ico,jpg,png,tif,pdf,mp4,kmz,gz,zip}'],
      process: function (content/*, srcpath*/) {
        // replace {{VERSION}} in php/html with version from package.json
        return content.replace('{{VERSION}}', packageJson.version);
      }
    }
  },

  test: {
    expand: true,
    cwd: config.test,
    dest: config.build + '/' + config.test,
    src: [
      '**/*',
      '!**/*.js'
    ],
    filter: 'isFile'
  },

  test_depends: {
    expand: true,
    cwd: 'node_modules',
    dest: config.build + '/' + config.test,
    src: [
      'mocha/mocha.{js,css}',
      'chai/chai.js',
      'sinon/pkg/sinon.js'
    ],
    filter: 'isFile'
  },

  dist: {
    expand: true,
    cwd: config.build + '/' + config.src,
    dest: config.dist,
    src: [
      '**/*',
      '!**/*.js',
      '!**/*.css'
    ],
    filter: 'isFile',
    options: {
      mode: true
    }
  }

};


module.exports = copy;
