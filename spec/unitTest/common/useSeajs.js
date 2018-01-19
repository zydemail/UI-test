/**
 * 使用seajs加载模块
 */
(function(__karma__, seajs) {
    var tests = [],
        file;
    var alias = {};
    // src alias
    for (file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {
            // 获取base下的文件路径作为seajs模块的key
            var name = file.match(/(.+)\.js/)[1];
            alias[name] = file;
        }
    }
    seajs.config({
        alias: alias
    });
    // console.log("alias: " + JSON.stringify(alias));

    var __start = __karma__.start;
    __karma__.start = function() {
        seajs.use(['/base/spec/unitTest/common/main'], function() { // 测试入口文件的路径
            __start.call(); // 要在seajs模块载入后调用,否则会加载不到任何测试用例
        });
    };
})(window.__karma__, seajs);