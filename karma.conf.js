// Karma configuration
// Generated on Fri Jan 20 2017 11:26:25 GMT+0200 (FLE Standard Time)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    coverageReporter: {
      type: 'lcov', dir: 'coverage/'
    },
    files: [
      'dist/collit.js',
      'test/*.js'
    ],
    preprocessors: {
      'dist/collit.js': ['coverage']
    },
    reporters: ['progress', 'coverage', 'coveralls'],
    port: 9876,
    browsers: ['PhantomJS'],
    singleRun: true,
    captureTimeout: 4 * 60 * 1000
  })
};
