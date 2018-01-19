// Karma configuration  https://www.npmjs.com/package/karma
// Generated on Fri Jul 08 2016 16:56:22 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha' ,'chai-as-promised', 'chai'],

    // list of files / patterns to load in the browser
    // You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
    files: [
        // 注意此处影响加载顺序，务必先加载库文件
        'src/js/lib/lib*.js',
        'src/js/lib/glue*.js',
        'src/js/common/**/*.js',
        'src/js/page/**/*.js',
        'spec/unitTest/**/*.js'
    ],


    // list of files to exclude
    exclude: [
        // 'node_modules/*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
         // 'js/src/*.js':'coverage'
    },


    // test results reporter to use
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress', 'coverage'],
    reporters: ['mocha', 'html'],

    // html: https://www.npmjs.com/package/karma-html-reporter-update
    // the default configuration
    htmlReporter: {
      outputDir: 'reporter/unitTest', // where to put the reports
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: true, // name files instead of creating sub-directories
      pageTitle: null, // page title for reports; browser info by default
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
      reportName: 'unitTestReporter', // report summary filename; browser info by default
      // experimental
      preserveDescribeNesting: false, // folded suites stay folded
      foldAll: false // reports start folded (only with preserveDescribeNesting)
    },

    // mocha: https://www.npmjs.com/package/karma-mocha-reporter

    // coverage: https://www.npmjs.com/package/karma-coverage
    // coverageReporter: {
    //     type: 'html',
    //     dir: 'reporter/coverage/'
    // },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    browsers: ['PhantomJS', 'PhantomJS_custom'],
        customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          }
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity

  });
};
