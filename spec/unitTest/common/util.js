/**
 * 常用函数
 */
define(function(require, exports, module) {

    var config = require('./config');

    module.exports = {
        initTestZone: function() { // 创建HTML测试区，在其内部创建组件
            var CONTENT_HTML = '<div id="testContent">~~ Test Zone ~~</div>';
            $('body').prepend(CONTENT_HTML);
        },
        initComponent: function(cfgName, cb) {
            var instance = null;
            var HTML = config.template[cfgName];
            var element = $(HTML);
            // 清空测试区，添加新组件
            $('#testContent').html('').append(element);
            // 初始化当前组件
            glue.init({});
            glue.ready(function() {
                // 获取组件实例
                instance = glue.getComponentInstance(element);
                cb(instance);
            });
        },
        destroyComponent: function(instance) {
            // 销毁当前组件
            instance.destroy();
        },
        importCss: function(url) {
            // 引入css
            $("<link>").attr({
                rel: "stylesheet",
                type: "text/css",
                href: url
            }).appendTo("head");
        }
    };

});