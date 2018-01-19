/**
 * 测试入口文件
 */
define(function(require) {
    require('../../../src/js/lib/glue.seajs.2.1.3.min');
    var util = require('./util');

    // 引入css
    util.importCss("http://static.qiyi.com/css/20160708/h5-v3.css");

    // 创建HTML测试区
    util.initTestZone();

    // 引入测试文件（注意：seajs测试脚本只有在此处添加后才能执行）
    // require('../testComponent.spec');
    // require('../testBehavior.spec');
    require('../videoInfo.spec');

});