/**
 * 将模板文件读入配置，便于测试页面调用
 */
var fs = require("fs"),
    templatePath = 'src/template',
    configPath = 'spec/unitTest/common/config.js';

exports.buildTemplateCfg = buildTemplateCfg;
// buildTemplateCfg();

function buildTemplateCfg(callback) {
    // 遍历读取模板文件
    deleteFile();
    writeFileNow(configPath, 'define(function(require, exports, module) {\r\n\tmodule.exports = APP.createService({\r\n\t\ttemplate: {\r\n');
    explorer(templatePath, function(file) {
        var data = fs.readFileSync(file);
        writeConfig(file, data.toString());
    });
    writeFileNow(configPath, '\t\t}\r\n\t});\r\n});\r\n');
    // console.log("cb");
    callback && callback();
}


function writeConfig(file, data) {
    var name = file.match(/([^/\\\\]+).html$/)[1];
    var itemStr = "\t\t\t" + name + ": '" + data.replace(/\r\n/g, '') + "',\r\n\r\n";
    writeFileNow(configPath, itemStr);
    // console.log('write a new file!');
}


function writeFileNow(path, data, f) {
    fs.writeFileSync(path, data, {
        flag: f ? f : 'a'
    });
}


function deleteFile() {
    // console.log("delete Cfg!");
    fs.unlinkSync(configPath);
}


/**
 * 递归找出所有文件路径
 * @param  {String} path 根路径
 * @param  {Function} callback 针对每个文件路径进行回调
 */
function explorer(path, callback) {
    var files = fs.readdirSync(path),
        stat = null;
    files.forEach(function(file, index, arr) {
        stat = fs.statSync(path + '/' + file);
        if (stat.isDirectory()) {
            // 如果是文件夹遍历
            explorer(path + '/' + file);
        } else {
            // 读出所有的文件
            // console.log('read file:' + path + '/' + file);
            callback && callback(path + '/' + file);
        }
        if (index === arr.length - 1) {
            // console.log("last explore")
        }
    });
}