// 引入模块
var gulp = require('gulp');
var Server = require('karma').Server;
var mocha = require('gulp-mocha');
// var imageResize = require('gulp-image-resize');
// var gm = require('gulp-gm');
var prepare = require('./task/prepare');


/**
 * 【准备工作】将组件模板写入配置文件
 */
gulp.task('buildTemplateCfg', function(cb) {
    prepare.buildTemplateCfg(cb);
});

/**
 * 【单元测试】Karma & mocha chai
 */
gulp.task('unitTest', ['buildTemplateCfg'], function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

/**
 * 【UI测试】selenium-webdriver & mocha chai
 */
gulp.task('UITest', function() {
    return gulp.src('./spec/UITest/**/*.spec.js', {
            read: false
        }).pipe(mocha({
            // reporter: 'spec',
            // timeout: 5000
            reporter: 'mochawesome',
            reporterOptions: {
                reportDir: 'reporter/UITest',
                reportName: 'UITestReporter'
            }
        }));
});
// gulp.task('width', function () {
//   gulp.src('./img/test.png')
//     .pipe(imageResize({
//       width: 100
//     }))
//     .pipe(gulp.dest('./dist'));
// });
// gulp.task('test', function () {
//   gulp.src('./img/test.png')

//     .pipe(gm(function (gmfile) {

//       return gmfile.resize(100, 100);

//     }))

//     .pipe(gulp.dest('./dist'));
// });
// 默认任务
gulp.task('default', ['unitTest', 'UITest']);

// 监视文件变化
gulp.watch(['spec/unitTest/**/*.js'], ['unitTest']);
gulp.watch(['spec/UITest/**/*.js'], ['UITest']);


