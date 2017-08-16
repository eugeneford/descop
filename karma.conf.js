// Karma configuration

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    coverageReporter: {
      type: 'lcov', dir: 'coverage/'
    },
    files: [
      'dist/descop.js',
      'test/*.js'
    ],
    preprocessors: {
      'dist/descop.js': ['coverage']
    },
    reporters: ['progress', 'coverage', 'coveralls'],
    port: 9876,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    browsers: [process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'],
    singleRun: true,
    captureTimeout: 4 * 60 * 1000
  })
};
