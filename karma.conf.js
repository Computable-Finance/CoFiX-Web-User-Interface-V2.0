// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');
const reportsDir = path.join(__dirname, 'reports');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha-reporter'),
      require('karma-junit-reporter'),
      require('karma-htmlfile-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: path.join(reportsDir, 'coverage'),
      reports: ['html', 'lcovonly', 'text-summary', 'json-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['mocha', 'kjhtml', 'junit', 'html'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    junitReporter: {
      outputDir: path.join(reportsDir, 'junit')
    },
    htmlReporter: {
      outputFile: path.join(reportsDir, 'karma_html/index.html')
    }
  });
};
